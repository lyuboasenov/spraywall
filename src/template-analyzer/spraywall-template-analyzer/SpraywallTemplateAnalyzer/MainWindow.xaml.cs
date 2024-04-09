using Newtonsoft.Json;
using SkiaSharp;
using SkiaSharp.Views.WPF;
using SpraywallTemplateAnalyzer.ImageProcessing;
using SpraywallTemplateAnalyzer.Models;
using SpraywallTemplateAnalyzer.Serialization;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media;

namespace SpraywallTemplateAnalyzer {
   /// <summary>
   /// Interaction logic for MainWindow.xaml
   /// </summary>
   public partial class MainWindow : Window {

      private string imgLocation;
      private TemplateProcessor _processor;
      private SKBitmap _bitmap;
      private ObservableCollection<SelectableHold> _selectableHolds = new ObservableCollection<SelectableHold>();
      private Template _importedTemplate;
      private Random _rand = new Random();
      private List<System.Drawing.Point> _addHoldBuffer = new List<System.Drawing.Point>();
      private SelectableHold _hoveredHold;
      private SelectableHold _editHold;


      private uint _maxSize = 5000;
      private uint _minArea = 0;
      private uint _maxRatio = 30;
      private double _cannyThreshold = 180;
      private double _accThreshold = 120;

      private uint _point = 0;

      private List<System.Windows.Media.Color> _colors = new List<System.Windows.Media.Color>();

      public MainWindow() {
         InitializeComponent();
         this.DataContext = this;

         for (int i = 0; i < 3000; i++) {
            _colors.Add(RandomColor());
         }
      }

      private void _modelTuneWindow_Apply(object? sender, EventArgs e) {
         _processor?.ProcessImage();
         ReLoadEllipses();
      }

      private void _modelTuneWindow_Deduplicate(object? sender, EventArgs e) {
         ReLoadEllipses();
      }

      private void _modelTuneWindow_PropertyChanged(object? sender, System.ComponentModel.PropertyChangedEventArgs e) {
         if (null != _processor && sender is ModelTuneWindow w) {
            if (e.PropertyName == nameof(ModelTuneWindow.MaxSize)) {
               _maxSize = w.MaxSize;
               _processor.MaxSize = w.MaxSize;
            } else if (e.PropertyName == nameof(ModelTuneWindow.MinArea)) {
               _minArea = w.MinArea;
               _processor.MinArea = w.MinArea;
            } else if (e.PropertyName == nameof(ModelTuneWindow.MaxRatio)) {
               _maxRatio = w.MaxRatio;
               _processor.MaxRatio = w.MaxRatio;
            } else if (e.PropertyName == nameof(ModelTuneWindow.Point)) {
               _point = w.Point;
            } else if (e.PropertyName == nameof(ModelTuneWindow.CannyThreshold)) {
               _cannyThreshold = w.CannyThreshold;
               _processor.CannyThreshold = w.CannyThreshold;
            } else if (e.PropertyName == nameof(ModelTuneWindow.AccThreshold)) {
               _accThreshold = w.AccThreshold;
               _processor.CircleAccumulatorThreshold = w.AccThreshold;
            }

            img.InvalidateVisual();
            ReLoadEllipses();
         }
      }

      private void btnSave_Click(object sender, RoutedEventArgs e) {
         var result = new Template();
         if (!string.IsNullOrEmpty(imgLocation) && File.Exists(imgLocation) && null != _selectableHolds) {
            var imgBytes = File.ReadAllBytes(imgLocation);
            result.EncodedImage = Convert.ToBase64String(imgBytes);
            result.MaxSize = _processor.MaxSize;
            result.MinArea = _processor.MinArea;
            result.MaxRatio = _processor.MaxRatio;

            result.Holds = _processor.Holds.
               OrderBy(e => e.MinRect.Size.Width / 2 + e.MinRect.Center.X).
               ThenBy(e => e.MinRect.Size.Height / 2 + e.MinRect.Center.Y).
               Select(e => new SelectableHold() {
                  Hold = e,
                  IsSelected = _selectableHolds.Any(ee => ee.IsSelected && ee.Hold.Equals(e))
               }).ToArray();
         } else if (_importedTemplate != null) {
            result.EncodedImage = _importedTemplate.EncodedImage;
            result.MaxSize = _processor.MaxSize;
            result.MinArea = _processor.MinArea;
            result.MaxRatio = _processor.MaxRatio;

            result.Holds = _processor.Holds.OrderByDescending(e => e.MinRect.Size.Width * e.MinRect.Size.Height).
               Select(e => new SelectableHold() {
                  Hold = e,
                  IsSelected = _selectableHolds?.Any(ee => ee.IsSelected && ee.Hold.Equals(e)) ?? false
               }).ToArray();
         }

         var dialog = new Microsoft.Win32.SaveFileDialog();
         dialog.FileName = "template-draft";       // Default file name
         dialog.DefaultExt = ".json";              // Default file extension
         dialog.Filter = "JSON (*.json)|*.json";   // Filter files by extension

         if (dialog.ShowDialog() ?? false) {
            File.WriteAllText(
               dialog.FileName,
               JsonConvert.SerializeObject(
                  result,
                  new SizeJsonConverter(), new PointJsonConverter()));
         }
      }

      private void btnExport_Click(object sender, RoutedEventArgs e) {
         string encodedImage = string.Empty;

         if (!string.IsNullOrEmpty(imgLocation) && File.Exists(imgLocation) && null != _selectableHolds) {
            var imgBytes = File.ReadAllBytes(imgLocation);
            encodedImage = Convert.ToBase64String(imgBytes);
         } else if (_importedTemplate != null) {
            encodedImage = _importedTemplate.EncodedImage;
         }

         var result = TemplateExporter.Export(
            encodedImage,
            _processor.FilteredHolds.
               OrderBy(e => e.MinRect.Size.Width / 2 + e.MinRect.Center.X).
               ThenBy(e => e.MinRect.Size.Height / 2 + e.MinRect.Center.Y).
               ToArray());

         var dialog = new Microsoft.Win32.SaveFileDialog();
         dialog.FileName = "template";             // Default file name
         dialog.DefaultExt = ".json";              // Default file extension
         dialog.Filter = "JSON (*.json)|*.json";   // Filter files by extension

         if (dialog.ShowDialog() ?? false) {
            var fi = new FileInfo(dialog.FileName);
            var newName = fi.Name + DateTime.UtcNow.ToString("yyyy-MM-ddTHH-mm-ss") + fi.Extension;

            File.WriteAllText(
               Path.Combine(fi.Directory.FullName, newName),
               JsonConvert.SerializeObject(
                  result,
                  new SizeJsonConverter(),
                  new PointJsonConverter()));
         }
      }

      private void btnBrawses_Click(object sender, RoutedEventArgs e) {
         var dialog = new Microsoft.Win32.OpenFileDialog();
         dialog.FileName = "template";                                     // Default file name
         dialog.DefaultExt = ".jpg";                                       // Default file extension
         dialog.Filter = "Images (*.jpg)|*.jpg|Images (*.jpeg)|*.jpeg";    // Filter files by extension

         if (dialog.ShowDialog() ?? false) {
            imgLocation = dialog.FileName;
            _processor = TemplateProcessor.Process(imgLocation);
            _minArea = _processor.MinArea;
            _maxRatio = _processor.MaxRatio;
            _maxSize = _processor.MaxSize;

            _bitmap = SKBitmap.Decode(File.OpenRead(imgLocation));
            img.Width = _bitmap.Width;
            img.Height = _bitmap.Height;

            img.InvalidateVisual();
            ReLoadEllipses();
         }
      }

      private void btnLoad_Click(object sender, RoutedEventArgs e) {
         var dialog = new Microsoft.Win32.OpenFileDialog();
         dialog.FileName = "template-draft";          // Default file name
         dialog.DefaultExt = ".json";                 // Default file extension
         dialog.Filter = "JSON (*.json)|*.json";      // Filter files by extension

         if (dialog.ShowDialog() ?? false) {
            _importedTemplate = JsonConvert.DeserializeObject<Template>(
               File.ReadAllText(dialog.FileName),
               new SizeJsonConverter(), new PointJsonConverter());

            _processor = TemplateProcessor.Import(
               _importedTemplate.Holds.Select(e => e.Hold),
               _importedTemplate.MaxSize,
               _importedTemplate.MinArea,
               _importedTemplate.MaxRatio);

            _minArea = _processor.MinArea;
            _maxRatio = _processor.MaxRatio;
            _maxSize = _processor.MaxSize;

            _bitmap = SKBitmap.Decode(Convert.FromBase64String(_importedTemplate.EncodedImage));
            img.Width = _bitmap.Width;
            img.Height = _bitmap.Height;
            img.InvalidateVisual();
            ReLoadEllipses();

            foreach (var el in _selectableHolds) {
               if (_importedTemplate.Holds.Any(e => e.IsSelected && e.Hold.Equals(el.Hold))) {
                  el.IsSelected = true;
               }
            }
         }
      }

      private void ReLoadEllipses() {
         lstEllipses.ItemsSource = null;
         _selectableHolds.Clear();

         int i = 0;
         foreach(var el in _processor?.
            FilteredHolds.
            OrderBy(MidPointY) ?? Enumerable.Empty<Hold>()) {
            var elItem = new SelectableHold() {
               Hold = el,
               IsSelected = true,
               Color = _colors[(i++) % 3000],
            };
            _selectableHolds.Add(elItem);
         }

         lstEllipses.ItemsSource = _selectableHolds;
         txtAddedPoints.Text = $"{_addHoldBuffer.Count} / {_selectableHolds.Count}";
      }

      private double MidPointY(Hold hold) {
         return hold.Contour.Average(p => p.Y);
      }

      private System.Windows.Media.Color RandomColor() {
         return new System.Windows.Media.Color() {
            A = 255,
            R = (byte) _rand.Next(0, 255),
            G = (byte) _rand.Next(0, 255),
            B = (byte) _rand.Next(0, 255),
         };
      }

      private void img_PaintSurface(object sender, SkiaSharp.Views.Desktop.SKPaintSurfaceEventArgs e) {
         if (_bitmap != null) {
            if (sender is SKElement img) {
               img.Width = _bitmap.Width;
               img.Height = _bitmap.Height;
            }
            var canvas = e.Surface.Canvas;
            using (var selpaint = new SKPaint())
            using (var spaint = new SKPaint())
            using (var epaint = new SKPaint())
            using (var paint = new SKPaint()) {
               paint.Color = SKColors.Yellow;
               paint.Style = SKPaintStyle.Fill;

               spaint.Color = SKColors.Green;
               spaint.StrokeWidth = 10;
               spaint.Style = SKPaintStyle.Stroke;

               selpaint.Color = SKColors.DeepPink;
               selpaint.StrokeWidth = 10;
               selpaint.Style = SKPaintStyle.Stroke;
               
               epaint.Color = SKColors.Red;
               epaint.StrokeWidth = 10;
               epaint.Style = SKPaintStyle.Stroke;

               using var imgpaint = new SKPaint();

               // Define a grayscale color filter to apply to the image
               imgpaint.ColorFilter = SKColorFilter.CreateColorMatrix(new float[]
               {
                            0.2126f, 0.7152f, 0.0722f, 0, 0,  // red channel weights
                    0.2126f, 0.7152f, 0.0722f, 0, 0,  // green channel weights
                    0.2126f, 0.7152f, 0.0722f, 0, 0,  // blue channel weights
                    0,       0,       0,       1, 0   // alpha channel weights
                                 });

               // redraw the image using the color filter
               canvas.DrawImage(SKImage.FromBitmap(_bitmap), 0, 0, imgpaint);

               if (_addHoldBuffer.Any()) {
                  paint.StrokeWidth = 3;
                  paint.Color = SKColors.LightGreen;

                  foreach (var p in _addHoldBuffer) {
                     canvas.DrawPoint(new SKPoint(p.X, p.Y), paint);
                  }
                  paint.StrokeWidth = 10;
                  paint.Color = SKColors.Green;
                  paint.Style = SKPaintStyle.Fill;

                  var f = _addHoldBuffer.First();
                  canvas.DrawCircle(new SKPoint(f.X, f.Y), 5, paint);

                  paint.StrokeWidth = 5;
                  paint.Color = SKColors.Red;
                  paint.Style = SKPaintStyle.Stroke;

                  var l = _addHoldBuffer.Last();
                  canvas.DrawPoint(new SKPoint(l.X, l.Y), paint);
               } else {
                  if (_selectableHolds.Any()) {
                     foreach (var elItem in _selectableHolds.Where(e => e.IsSelected)) {
                        if (elItem != _editHold) {
                           var el = elItem.Hold.MinRect;
                           paint.Color = ConvertColor(elItem.Color);
                           var points = ToSkPoints(elItem.Hold.Contour);

                           using (var path = new SKPath()) {


                              path.AddPoly(points, true);

                              canvas.DrawPath(path, paint);

                              canvas.DrawPoint(points[0], spaint);
                              canvas.DrawPoint(points[points.Length - 1], epaint);
                              if (_point < points.Length) {

                                 canvas.DrawPoint(points[_point], selpaint);
                              }
                           }
                        }
                     }
                  }
               }
            }

            if (null != _hoveredHold) {
               var avgPoint = new SKPoint {
                  X = (int) Math.Round(_hoveredHold.Hold.Contour.Average(p => p.X)),
                  Y = (int) Math.Round(_hoveredHold.Hold.Contour.Average(p => p.Y))
               };

               using (var paint = new SKPaint()) {
                  paint.Color = SKColors.Cyan;
                  paint.Style = SKPaintStyle.Stroke;

                  for(int i = 1; i <= 3; i++) {
                     paint.StrokeWidth = 4 * i;

                     canvas.DrawCircle(avgPoint, i * 120, paint);
                  }
               }
            }
         }
      }

      private SKPoint[] ToSkPoints(System.Drawing.Point[] contour) {
         var list = new List<SKPoint>();

         for(int i = 0; i < contour.Length; i++) {
            list.Add(new SKPoint(contour[i].X, contour[i].Y));
         }

         return list.ToArray();
      }

      private SKColor ConvertColor(System.Windows.Media.Color c) {
         return new SKColor(c.R, c.G, c.B);
      }

      private void CheckBox_Checked(object sender, RoutedEventArgs e) {
         img.InvalidateVisual();
      }

      private void btnRemoveItem_Click(object sender, RoutedEventArgs e) {
         var item = ((Button) sender).DataContext as SelectableHold;
         if (item != null) {
            _processor.Remove(item.Hold);
            _selectableHolds.Remove(item);
            img.InvalidateVisual();
         }

         txtAddedPoints.Text = $"{_addHoldBuffer.Count} / {_selectableHolds.Count}";
      }

      private void img_MouseLeftButtonDown(object sender, System.Windows.Input.MouseButtonEventArgs e) {
         var mainWindow = Application.Current.MainWindow;
         var dpiScale = VisualTreeHelper.GetDpi(mainWindow);

         var dpiScaleX = dpiScale.DpiScaleX;
         var dpiScaleY = dpiScale.DpiScaleY;

         
         var pixelPosition = e.GetPosition(sender as SKElement);
         var scaledPixelPosition = new System.Drawing.Point((int)(pixelPosition.X * dpiScaleX), (int) (pixelPosition.Y * dpiScaleY));

         _addHoldBuffer.Add(scaledPixelPosition);
         if (_addHoldBuffer.Count > 4 ) {
            var points = _addHoldBuffer.ToArray();
            _addHoldBuffer.Clear();
            _addHoldBuffer.AddRange(TemplateProcessor.RearrangeContour(points));
         }

         txtAddedPoints.Text = $"{_addHoldBuffer.Count} / {_selectableHolds.Count}";

         img.InvalidateVisual();
      }

      private void img_MouseRightButtonDown(object sender, System.Windows.Input.MouseButtonEventArgs e) {
         if (_addHoldBuffer.Count > 3) {

            if (_editHold != null) {
               _editHold.Hold.Contour = _addHoldBuffer.ToArray();
               _editHold = null;
               _addHoldBuffer.Clear();
            } else {
               var hold = _processor.Add(_addHoldBuffer);
               _addHoldBuffer.Clear();

               _selectableHolds.Insert(0, new SelectableHold() {
                  Hold = hold,
                  IsSelected = true,
                  Color = RandomColor()
               });
            }

            img.InvalidateVisual();
         }
      }

      private void btnSelectAll_Click(object sender, RoutedEventArgs e) {
         foreach (var el in _selectableHolds) {
            el.IsSelected = true;
         }
         img.InvalidateVisual();
      }

      private void btnSelectNone_Click(object sender, RoutedEventArgs e) {
         foreach (var el in _selectableHolds) {
            el.IsSelected = false;
         }
         img.InvalidateVisual();
      }

      private void StackPanel_MouseEnter(object sender, System.Windows.Input.MouseEventArgs e) {
         if (sender is StackPanel sp) {
            if (sp.DataContext is SelectableHold rr) {
               _hoveredHold = rr;

               if (!IsCheckboxChildChecked(sp)) {
                  rr.IsSelected = !rr.IsSelected;
               }
               img.InvalidateVisual();
            }
         }
      }

      private void StackPanel_MouseLeave(object sender, System.Windows.Input.MouseEventArgs e) {
         if (sender is StackPanel sp && !IsCheckboxChildChecked(sp)) {
            if (sp.DataContext is SelectableHold rr) {
               _hoveredHold = null;

               img.InvalidateVisual();
            }
         }
      }

      private static bool IsCheckboxChildChecked(StackPanel sp) {
         for(int i = 0; i < sp.Children.Count; i++) {
            if (sp.Children[i] is CheckBox c && (c.IsChecked ?? false)) {
               return true;
            }
         }
         return false;
      }

      private void btnTuneModel_Click(object sender, RoutedEventArgs e) {
         var w = new ModelTuneWindow();
         w.MaxSize = _maxSize;
         w.MinArea = _minArea;
         w.MaxRatio = _maxRatio;
         w.Point = _point;
         w.CannyThreshold = _cannyThreshold;
         w.AccThreshold = _accThreshold;
         
         w.PropertyChanged += _modelTuneWindow_PropertyChanged;
         w.Deactivated += _modelTuneWindow_Deduplicate;
         w.Apply += _modelTuneWindow_Apply;

         w.Show();
      }

      private void btnEditItem_Click(object sender, RoutedEventArgs e) {
         var item = ((Button) sender).DataContext as SelectableHold;
         if (item != null) {
            _editHold = item;
            _addHoldBuffer.Clear();
            _addHoldBuffer.AddRange(item.Hold.Contour);
            img.InvalidateVisual();
         }
      }

      private void img_MouseWheel(object sender, MouseWheelEventArgs e) {
         if (Keyboard.IsKeyDown(Key.LeftCtrl)) {
            if (e.Delta > 0) {
               slZoom.Value += 0.05;
            } else {
               slZoom.Value -= 0.05;
            }
            e.Handled = true;
         }
      }

      private Point _imgPanStartPosition;
      private void img_MouseDown(object sender, MouseButtonEventArgs e) {
         if (e.ChangedButton == MouseButton.Middle) {
            _imgPanStartPosition = e.GetPosition(sender as SKElement);
            e.MouseDevice.SetCursor(Cursors.ScrollAll);
         }
      }

      private void img_MouseMove(object sender, MouseEventArgs e) {
         if (e.MouseDevice.MiddleButton == MouseButtonState.Pressed) {
            e.MouseDevice.SetCursor(Cursors.ScrollAll);
            var pos = e.GetPosition(sender as SKElement);

            svScroll.ScrollToVerticalOffset(svScroll.VerticalOffset +  _imgPanStartPosition.Y - pos.Y);
            svScroll.ScrollToHorizontalOffset(svScroll.HorizontalOffset + _imgPanStartPosition.X - pos.X);

            e.Handled = true;
         }
      }

      private void img_MouseUp(object sender, MouseButtonEventArgs e) {
         if (e.ChangedButton == MouseButton.Middle) {
            e.MouseDevice.SetCursor(Cursors.Arrow);
         }
      }
   }
}
