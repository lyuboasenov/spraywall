using Emgu.CV.Structure;
using Emgu.CV.Util;
using Newtonsoft.Json;
using SkiaSharp;
using SkiaSharp.Views.WPF;
using SpraywallTemplateAnalyzer.ImageProcessing;
using SpraywallTemplateAnalyzer.Models;
using SpraywallTemplateAnalyzer.Serialization;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
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
      private List<PointF> _addEllipseBuffer = new List<PointF>();

      private uint _maxSize = 5000;
      private uint _minArea = 0;
      private uint _maxRatio = 30;
      private double _cannyThreshold = 180;
      private double _accThreshold = 120;

      private uint _point = 0;

      List<System.Windows.Media.Color> _colors = new List<System.Windows.Media.Color>();

      public MainWindow() {
         InitializeComponent();

         for (int i = 0; i < 3000; i++) {
            _colors.Add(RandomColor());
         }
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
               OrderBy(e => e.Ellipse.Size.Width / 2 + e.Ellipse.Center.X).
               ThenBy(e => e.Ellipse.Size.Height / 2 + e.Ellipse.Center.Y).
               Select(e => new SelectableHold() {
                  Hold = e,
                  IsSelected = _selectableHolds.Any(ee => ee.IsSelected && ee.Hold.Equals(e))
               }).ToArray();
         } else if (_importedTemplate != null) {
            result.EncodedImage = _importedTemplate.EncodedImage;
            result.MaxSize = _processor.MaxSize;
            result.MinArea = _processor.MinArea;
            result.MaxRatio = _processor.MaxRatio;

            result.Holds = _processor.Holds.OrderByDescending(e => e.Ellipse.Size.Width * e.Ellipse.Size.Height).
               Select(e => new SelectableHold() {
                  Hold = e,
                  IsSelected = _selectableHolds.Any(ee => ee.IsSelected && ee.Hold.Equals(e))
               }).ToArray();
         }

         var dialog = new Microsoft.Win32.SaveFileDialog();
         dialog.FileName = "template-draft"; // Default file name
         dialog.DefaultExt = ".json"; // Default file extension
         dialog.Filter = "JSON (*.json)|*.json"; // Filter files by extension

         if (dialog.ShowDialog() ?? false) {
            File.WriteAllText(
               dialog.FileName,
               JsonConvert.SerializeObject(
                  result,
                  new SizeJsonConverter()));
         }
      }

      private void btnExport_Click(object sender, RoutedEventArgs e) {
         var result = new ExportTemplate();
         if (!string.IsNullOrEmpty(imgLocation) && File.Exists(imgLocation) && null != _selectableHolds) {
            var imgBytes = File.ReadAllBytes(imgLocation);
            result.EncodedImage = Convert.ToBase64String(imgBytes);

            result.Holds = _processor.FilteredHolds.
               OrderBy(e => e.Ellipse.Size.Width / 2 + e.Ellipse.Center.X).
               ThenBy(e => e.Ellipse.Size.Height / 2 + e.Ellipse.Center.Y).
               ToArray();
         } else if (_importedTemplate != null) {
            result.EncodedImage = _importedTemplate.EncodedImage;

            result.Holds = _processor.FilteredHolds.
               OrderBy(e => e.Ellipse.Size.Width / 2 + e.Ellipse.Center.X).
               ThenBy(e => e.Ellipse.Size.Height / 2 + e.Ellipse.Center.Y).
               ToArray();
         }

         var dialog = new Microsoft.Win32.SaveFileDialog();
         dialog.FileName = "template"; // Default file name
         dialog.DefaultExt = ".json"; // Default file extension
         dialog.Filter = "JSON (*.json)|*.json"; // Filter files by extension

         if (dialog.ShowDialog() ?? false) {
            File.WriteAllText(
               dialog.FileName,
               JsonConvert.SerializeObject(
                  result,
                  new SizeJsonConverter()));
         }
      }

      private void btnBrawses_Click(object sender, RoutedEventArgs e) {
         var dialog = new Microsoft.Win32.OpenFileDialog();
         dialog.FileName = "template"; // Default file name
         dialog.DefaultExt = ".jpg"; // Default file extension
         dialog.Filter = "Images (*.jpg)|*.jpg|Images (*.jpeg)|*.jpeg"; // Filter files by extension

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
         dialog.FileName = "template-draft"; // Default file name
         dialog.DefaultExt = ".json"; // Default file extension
         dialog.Filter = "JSON (*.json)|*.json"; // Filter files by extension

         if (dialog.ShowDialog() ?? false) {
            _importedTemplate = JsonConvert.DeserializeObject<Template>(
               File.ReadAllText(dialog.FileName),
               new SizeJsonConverter());

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
            OrderBy(e => e.Ellipse.Center.Y) ?? Enumerable.Empty<Hold>()) {
            var elItem = new SelectableHold() {
               Hold = el,
               IsSelected = true,
               Color = _colors[i++],
            };
            _selectableHolds.Add(elItem);
         }

         lstEllipses.ItemsSource = _selectableHolds;
         txtAddedPoints.Text = $"{_addEllipseBuffer.Count} / {_selectableHolds.Count}";
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
               paint.StrokeWidth = 5;
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
               if (_selectableHolds.Any()) {
                  foreach (var elItem in _selectableHolds.Where(e => e.IsSelected)) {
                     var el = elItem.Hold.Ellipse;
                     paint.Color = ConvertColor(elItem.Color);
                     var points = ToSkPoints(elItem.Hold.Contour);

                     using (var path  = new SKPath()) {


                        path.AddPoly(points, true);

                        canvas.DrawPath(path, paint);

                        //canvas.DrawPoints(SKPointMode.Polygon, points, paint);

                        canvas.DrawPoint(points[0], spaint);
                        canvas.DrawPoint(points[points.Length-1], epaint);
                        if (_point < points.Length) {

                           canvas.DrawPoint(points[_point], selpaint);
                        }
                     }
                  }
               }

               if (_addEllipseBuffer.Any()) {
                  foreach (var p in _addEllipseBuffer) {
                     canvas.DrawCircle(new SKPoint(p.X, p.Y), 2, paint);
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

         txtAddedPoints.Text = $"{_addEllipseBuffer.Count} / {_selectableHolds.Count}";
      }

      private void img_MouseLeftButtonDown(object sender, System.Windows.Input.MouseButtonEventArgs e) {
         var mainWindow = Application.Current.MainWindow;
         var dpiScale = VisualTreeHelper.GetDpi(mainWindow);

         var dpiScaleX = dpiScale.DpiScaleX;
         var dpiScaleY = dpiScale.DpiScaleY;

         
         var pixelPosition = e.GetPosition(sender as SKElement);
         var scaledPixelPosition = new System.Drawing.PointF((float) (pixelPosition.X * dpiScaleX), (float) (pixelPosition.Y * dpiScaleY));

         _addEllipseBuffer.Add(scaledPixelPosition);

         txtAddedPoints.Text = $"{_addEllipseBuffer.Count} / {_selectableHolds.Count}";

         img.InvalidateVisual();
      }

      private void img_MouseRightButtonDown(object sender, System.Windows.Input.MouseButtonEventArgs e) {
         if (_addEllipseBuffer.Count > 3) {
            var hold = _processor.Add(_addEllipseBuffer);
            _addEllipseBuffer.Clear();

            _selectableHolds.Insert(0, new SelectableHold() {
               Hold = hold,
               IsSelected = true
            });

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
         if (sender is StackPanel sp && !IsCheckboxChildChecked(sp)) {
            if (sp.DataContext is SelectableHold rr) {
               rr.IsSelected = !rr.IsSelected;
               img.InvalidateVisual();
            }
         }
      }

      private void StackPanel_MouseLeave(object sender, System.Windows.Input.MouseEventArgs e) {
         //if (sender is StackPanel sp && !IsCheckboxChildChecked(sp)) {
         //   if (sp.DataContext is SelectableRotatedRect rr) {
         //      rr.IsSelected = !rr.IsSelected;
         //      img.InvalidateVisual();
         //   } 
         //}
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

         w.Show();
      }

      private void btnEditItem_Click(object sender, RoutedEventArgs e) {

      }
   }
}
