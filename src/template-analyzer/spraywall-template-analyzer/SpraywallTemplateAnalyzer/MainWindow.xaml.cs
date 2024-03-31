using Emgu.CV.Structure;
using Newtonsoft.Json;
using SkiaSharp;
using SkiaSharp.Views.WPF;
using SpraywallTemplateAnalyzer.ImageProcessing;
using SpraywallTemplateAnalyzer.Models;
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
      private ObservableCollection<SelectableRotatedRect> _selectableEllipses = new ObservableCollection<SelectableRotatedRect>();
      private Template _importedTemplate;
      private Random _rand = new Random();
      private List<System.Drawing.PointF> _addEllipseBuffer = new List<System.Drawing.PointF>();

      private uint _maxSize = 400;
      private uint _minArea = 164;
      private uint _maxRatio = 4;

      private uint _centerOffset = 5;
      private uint _sizeThreshold = 10;

      public MainWindow() {
         InitializeComponent();
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
            } else if (e.PropertyName == nameof(ModelTuneWindow.CenterOffset)) {
               _centerOffset = w.CenterOffset;
               _processor.CenterOffset = w.CenterOffset;
            } else if (e.PropertyName == nameof(ModelTuneWindow.SizeThreshold)) {
               _sizeThreshold = w.SizeThreshold;
               _processor.SizeThreshold = w.SizeThreshold;
            }

            img.InvalidateVisual();
            ReLoadEllipses();
         }
      }

      private void btnExport_Click(object sender, RoutedEventArgs e) {
         var result = new Template();
         if (!string.IsNullOrEmpty(imgLocation) && File.Exists(imgLocation) && null != _selectableEllipses) {
            var imgBytes = File.ReadAllBytes(imgLocation);
            result.EncodedImage = Convert.ToBase64String(imgBytes);
            result.MaxSize = _processor.MaxSize;
            result.MinArea = _processor.MinArea;
            result.MaxRatio = _processor.MaxRatio;

            result.Elllipses = _processor.Ellipses.
               OrderBy(e => e.Size.Width / 2 + e.Center.X).
               ThenBy(e => e.Size.Height / 2 + e.Center.Y).
               Select(e => new SelectableRotatedRect() {
                  RotatedRect = e,
                  IsSelected = _selectableEllipses.Any(ee => ee.IsSelected && ee.RotatedRect.Equals(e))
               }).ToArray();
         } else if(_importedTemplate != null) {
            result.EncodedImage = _importedTemplate.EncodedImage;
            result.MaxSize = _processor.MaxSize;
            result.MinArea = _processor.MinArea;
            result.MaxRatio = _processor.MaxRatio;

            result.Elllipses = _processor.Ellipses.OrderByDescending(e => e.Size.Width * e.Size.Height).
               Select(e => new SelectableRotatedRect() {
                  RotatedRect = e,
                  IsSelected = _selectableEllipses.Any(ee => ee.IsSelected && ee.RotatedRect.Equals(e))
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
                  new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }));
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

      private void btnImport_Click(object sender, RoutedEventArgs e) {
         var dialog = new Microsoft.Win32.OpenFileDialog();
         dialog.FileName = "template-draft"; // Default file name
         dialog.DefaultExt = ".json"; // Default file extension
         dialog.Filter = "JSON (*.json)|*.json"; // Filter files by extension

         if (dialog.ShowDialog() ?? false) {
            _importedTemplate = JsonConvert.DeserializeObject<Template>(File.ReadAllText(dialog.FileName));

            _processor = TemplateProcessor.Import(
               _importedTemplate.Elllipses.Select(e => e.RotatedRect),
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

            foreach(var el in _selectableEllipses) {
               if (_importedTemplate.Elllipses.Any(e => e.IsSelected && e.RotatedRect.Equals(el.RotatedRect))) {
                  el.IsSelected = true;
               }
            }
         }
      }

      private void ReLoadEllipses() {
         lstEllipses.ItemsSource = null;
         _selectableEllipses.Clear();
         
         foreach(var el in _processor?.
            FilteredEllipses.
            OrderBy(e => e.Center.Y) ?? Enumerable.Empty<RotatedRect>()) {
            var elItem = new SelectableRotatedRect() {
               RotatedRect = el,
               IsSelected = false,
               Color = RandomColor()
            };
            _selectableEllipses.Add(elItem);
         }

         lstEllipses.ItemsSource = _selectableEllipses;
         txtAddedPoints.Text = $"{_addEllipseBuffer.Count} / {_selectableEllipses.Count}";
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
            using (var paint = new SKPaint()) {
               paint.Color = SKColors.Yellow;
               paint.StrokeWidth = 5;
               paint.Style = SKPaintStyle.Stroke;

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
               if (_selectableEllipses.Any()) {
                  foreach (var elItem in _selectableEllipses.Where(e => e.IsSelected)) {
                     var el = elItem.RotatedRect;
                     canvas.RotateDegrees(el.Angle, el.Center.X, el.Center.Y);
                     paint.Color = ConvertColor(elItem.Color);
                     canvas.DrawOval(el.Center.X, el.Center.Y, el.Size.Width / 2, el.Size.Height / 2, paint);

                     canvas.RotateDegrees(-el.Angle, el.Center.X, el.Center.Y);
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

      private SKColor ConvertColor(System.Windows.Media.Color c) {
         return new SKColor(c.R, c.G, c.B);
      }

      private void CheckBox_Checked(object sender, RoutedEventArgs e) {
         img.InvalidateVisual();
      }

      private void btnRemoveItem_Click(object sender, RoutedEventArgs e) {
         var item = ((Button) sender).DataContext as SelectableRotatedRect;
         if (item != null) {
            _processor.Remove(item.RotatedRect);
            _selectableEllipses.Remove(item);
            img.InvalidateVisual();
         }

         txtAddedPoints.Text = $"{_addEllipseBuffer.Count} / {_selectableEllipses.Count}";
      }


      private void img_MouseLeftButtonDown(object sender, System.Windows.Input.MouseButtonEventArgs e) {
         var mainWindow = Application.Current.MainWindow;
         var dpiScale = VisualTreeHelper.GetDpi(mainWindow);

         var dpiScaleX = dpiScale.DpiScaleX;
         var dpiScaleY = dpiScale.DpiScaleY;

         
         var pixelPosition = e.GetPosition(sender as SKElement);
         var scaledPixelPosition = new System.Drawing.PointF((float) (pixelPosition.X * dpiScaleX), (float) (pixelPosition.Y * dpiScaleY));

         _addEllipseBuffer.Add(scaledPixelPosition);

         txtAddedPoints.Text = $"{_addEllipseBuffer.Count} / {_selectableEllipses.Count}";

         img.InvalidateVisual();
      }

      private void img_MouseRightButtonDown(object sender, System.Windows.Input.MouseButtonEventArgs e) {
         if (_addEllipseBuffer.Count > 3) {
            var rect = _processor.Add(_addEllipseBuffer);
            _addEllipseBuffer.Clear();

            _selectableEllipses.Insert(0, new SelectableRotatedRect() {
               RotatedRect = rect,
               IsSelected = true
            });

            img.InvalidateVisual();
         }
      }

      private void btnSelectAll_Click(object sender, RoutedEventArgs e) {
         foreach (var el in _selectableEllipses) {
            el.IsSelected = true;
         }
         img.InvalidateVisual();
      }

      private void btnSelectNone_Click(object sender, RoutedEventArgs e) {
         foreach (var el in _selectableEllipses) {
            el.IsSelected = false;
         }
         img.InvalidateVisual();
      }

      private void StackPanel_MouseEnter(object sender, System.Windows.Input.MouseEventArgs e) {
         if (sender is StackPanel sp && !IsCheckboxChildChecked(sp)) {
            if (sp.DataContext is SelectableRotatedRect rr) {
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
         w.CenterOffset = _centerOffset;
         w.SizeThreshold = _sizeThreshold;
         
         w.PropertyChanged += _modelTuneWindow_PropertyChanged;
         w.Deactivated += _modelTuneWindow_Deduplicate;

         w.Show();
      }
   }
}
