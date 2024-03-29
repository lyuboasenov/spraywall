using Emgu.CV;
using Emgu.CV.CvEnum;
using Emgu.CV.OCR;
using Emgu.CV.Structure;
using Emgu.CV.Util;
using SkiaSharp;
using SpraywallTemplateAnalyzer.ImageProcessing;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using static Emgu.Util.Platform;

namespace SpraywallTemplateAnalyzer {
   /// <summary>
   /// Interaction logic for MainWindow.xaml
   /// </summary>
   public partial class MainWindow : Window {
      private FileInfo sourceImgFileInfo;
      private string imgLocation;
      private TemplateProcessor _processor;
      private SKBitmap _bitmap;

      public MainWindow() {
         InitializeComponent();
      }


      private void btnExport_Click(object sender, RoutedEventArgs e) {
      }

      private void btnBrawses_Click(object sender, RoutedEventArgs e) {
         var dialog = new Microsoft.Win32.OpenFileDialog();
         dialog.FileName = "template"; // Default file name
         dialog.DefaultExt = ".jpg"; // Default file extension
         dialog.Filter = "Images (*.jpg)|*.jpg|Images (*.jpeg)|*.jpeg"; // Filter files by extension

         if (dialog.ShowDialog() ?? false) {
            imgLocation = dialog.FileName;
            sourceImgFileInfo = new FileInfo(imgLocation);
            _processor = TemplateProcessor.Process(imgLocation);
            slArea.Value = _processor.MinArea;
            slRatio.Value = _processor.MaxRatio;
            slSize.Value = _processor.MaxSize;

            _bitmap = SKBitmap.Decode(File.OpenRead(imgLocation));
            img.Width = _bitmap.Width;
            img.Height = _bitmap.Height;
            img.InvalidateVisual();
         }
      }


      private void img_PaintSurface(object sender, SkiaSharp.Views.Desktop.SKPaintSurfaceEventArgs e) {
         if (_bitmap != null) {
            var canvas = e.Surface.Canvas;
            using (var paint = new SKPaint()) {
               paint.Color = SKColors.Yellow;
               paint.StrokeWidth = 5;
               paint.Style = SKPaintStyle.Stroke;

               canvas.DrawImage(SKImage.FromBitmap(_bitmap), new SKPoint());
               if (_processor != null && _processor.FilteredEllipses.Any()) {
                  foreach (var el in _processor.FilteredEllipses) {
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
         }
      }

      private void slArea_ValueChanged(object sender, RoutedPropertyChangedEventArgs<double> e) {
         if (null != _processor) {
            _processor.MinArea = (uint) e.NewValue;
            img.InvalidateVisual();
         }
      }

      private void slRatio_ValueChanged(object sender, RoutedPropertyChangedEventArgs<double> e) {
         if (null != _processor) {
            _processor.MaxRatio = (uint) e.NewValue;
            img.InvalidateVisual();
         }
      }
   }
}
