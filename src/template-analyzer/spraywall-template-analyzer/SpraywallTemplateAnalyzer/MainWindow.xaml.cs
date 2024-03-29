using Emgu.CV.Structure;
using Newtonsoft.Json;
using SkiaSharp;
using SpraywallTemplateAnalyzer.ImageProcessing;
using SpraywallTemplateAnalyzer.Models;
using System;
using System.Buffers.Text;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json.Serialization;
using System.Windows;
using System.Windows.Controls;

namespace SpraywallTemplateAnalyzer {
   /// <summary>
   /// Interaction logic for MainWindow.xaml
   /// </summary>
   public partial class MainWindow : Window {

      private string imgLocation;
      private TemplateProcessor _processor;
      private SKBitmap _bitmap;
      private List<SelectableRotatedRect> _selectableEllipses = new List<SelectableRotatedRect>();

      public MainWindow() {
         InitializeComponent();
      }


      private void btnExport_Click(object sender, RoutedEventArgs e) {
         var result = new Template();
         if (!string.IsNullOrEmpty(imgLocation) && File.Exists(imgLocation) && null != _selectableEllipses) {
            var imgBytes = File.ReadAllBytes(imgLocation);
            result.EncodedImage = Convert.ToBase64String(imgBytes);
            foreach(var el in _processor.Ellipses) {

            }
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
            slArea.Value = _processor.MinArea;
            slRatio.Value = _processor.MaxRatio;
            slSize.Value = _processor.MaxSize;

            _bitmap = SKBitmap.Decode(File.OpenRead(imgLocation));
            img.Width = _bitmap.Width;
            img.Height = _bitmap.Height;
            img.InvalidateVisual();
            ReLoadEllipses();
         }
      }

      private void ReLoadEllipses() {
         lstEllipses.ItemsSource = null;
         _selectableEllipses.Clear();
         
         foreach(var el in _processor?.FilteredEllipses.OrderByDescending(e => e.Size.Width * e.Size.Height) ?? Enumerable.Empty<RotatedRect>()) {
            var elItem = new SelectableRotatedRect() {
               RotatedRect = el,
               IsSelected = false
            };
            _selectableEllipses.Add(elItem);
         }

         lstEllipses.ItemsSource = _selectableEllipses;
      }

      private void img_PaintSurface(object sender, SkiaSharp.Views.Desktop.SKPaintSurfaceEventArgs e) {
         if (_bitmap != null) {
            var canvas = e.Surface.Canvas;
            using (var paint = new SKPaint()) {
               paint.Color = SKColors.Yellow;
               paint.StrokeWidth = 5;
               paint.Style = SKPaintStyle.Stroke;

               canvas.DrawImage(SKImage.FromBitmap(_bitmap), new SKPoint());
               if (_selectableEllipses.Any()) {
                  foreach (var elItem in _selectableEllipses.Where(e => e.IsSelected)) {
                     var el = elItem.RotatedRect;
                     canvas.RotateDegrees(el.Angle, el.Center.X, el.Center.Y);
                     canvas.DrawOval(el.Center.X, el.Center.Y, el.Size.Width / 2, el.Size.Height / 2, paint);
                     canvas.RotateDegrees(-el.Angle, el.Center.X, el.Center.Y);
                  }
               }
            }
         }
      }

      private void slSize_ValueChanged(object sender, RoutedPropertyChangedEventArgs<double> e) {
         if (null != _processor) {
            _processor.MaxSize = (uint) e.NewValue;
            img.InvalidateVisual();
            ReLoadEllipses();
         }
      }

      private void slArea_ValueChanged(object sender, RoutedPropertyChangedEventArgs<double> e) {
         if (null != _processor) {
            _processor.MinArea = (uint) e.NewValue;
            img.InvalidateVisual();
            ReLoadEllipses();
         }
      }

      private void slRatio_ValueChanged(object sender, RoutedPropertyChangedEventArgs<double> e) {
         if (null != _processor) {
            _processor.MaxRatio = (uint) e.NewValue;
            img.InvalidateVisual();
            ReLoadEllipses();
         }
      }

      private void CheckBox_Checked(object sender, RoutedEventArgs e) {
         img.InvalidateVisual();
      }
   }
}
