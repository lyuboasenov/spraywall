using Emgu.CV.CvEnum;
using Emgu.CV.Structure;
using Emgu.CV.Util;
using Emgu.CV;
using System.Collections.Generic;
using System.Linq;
using System.Drawing;
using System;

namespace SpraywallTemplateAnalyzer.ImageProcessing {
   internal class TemplateProcessor {

      private string _imgLocation;
      private const int MIN_SIZE = 10;
      private List<Hold> _holds = new List<Hold>();

      public uint MaxSize { get; set; } = 400;
      public uint MinArea { get; set; } = 164;
      public uint MaxRatio { get; set; } = 4;

      public uint CenterOffset { get; set; } = 5;
      public uint SizeThreshold { get; set; } = 10;
      
      public uint AngleOffset { get; set; } = 5;

      public IEnumerable<Hold> Holds { get {  return _holds; } }
      public IEnumerable<Hold> FilteredEllipses { 
         get {
            var result = new List<Hold>();
            foreach (var rect in _holds.Where(h => IsValid(h.Ellipse))) {
               //if (!result.Any(r => IsSimilar(r.Ellipse, rect.Ellipse))) {
               //   result.Add(rect);
               //}
               result.Add(rect);
            }
            return result;
         } 
      }

      private bool IsSimilar(RotatedRect x, RotatedRect y) {
         return
            Math.Abs(x.Center.X - y.Center.X) <= CenterOffset &&
            Math.Abs(x.Center.Y - y.Center.Y) <= CenterOffset &&
            Math.Abs(x.Size.Width - y.Size.Width) <= SizeThreshold &&
            Math.Abs(x.Size.Height - y.Size.Height) <= SizeThreshold &&
            Math.Abs(x.Angle - y.Angle) <= AngleOffset;
      }

      private TemplateProcessor() {

      }

      private TemplateProcessor(string imgLocation) {
         _imgLocation = imgLocation;
      }

      public static TemplateProcessor Process(string imgLocation) {
         var processor = new TemplateProcessor(imgLocation);
         processor.ProcessImage();

         return processor;
      }

      public static TemplateProcessor Import(IEnumerable<Hold> enumerable, uint maxSize, uint minArea, uint maxRatio) {
         var processor = new TemplateProcessor();
         processor._holds.AddRange(enumerable);
         processor.MaxSize = maxSize;
         processor.MinArea = minArea;
         processor.MaxRatio = maxRatio;

         return processor;
      }

      public void Remove(Hold rect) {
         _holds.Remove(rect);
      }

      public Hold Add(IEnumerable<PointF> points) {
         var rect = CvInvoke.MinAreaRect(points.ToArray());
         var hold = new Hold() {
            Contour = points.Select(p => new Point((int) p.X, (int) p.Y)).ToArray(),
            Ellipse = rect,
            MinRect = rect
         };
         _holds.Insert(0, hold);

         return hold;
      }

      public bool IsValidSize(RotatedRect r) {
         return r.Size.Width < MaxSize && r.Size.Height < MaxSize;
      }

      public bool IsValidArea(RotatedRect r) {
         return r.Size.Width * r.Size.Height > MinArea;
      }

      public bool IsValidRatio(RotatedRect r) {
         if (r.Size.Width > r.Size.Height) {
            return r.Size.Width / r.Size.Height < MaxRatio;
         } else {
            return r.Size.Height / r.Size.Width < MaxRatio;
         }
      }

      public bool IsValid(RotatedRect r) {
         return IsValidSize(r) && IsValidArea(r) && IsValidRatio(r);
      }

      private void ProcessImage() {
         using (Mat img = new Mat(_imgLocation))
         using (UMat gray = new UMat())
         using (UMat cannyEdges = new UMat())
         using (VectorOfVectorOfPoint contours = new VectorOfVectorOfPoint()) {
            //Convert the image to grayscale and filter out the noise
            CvInvoke.CvtColor(img, gray, ColorConversion.Bgr2Gray);

            //Remove noise
            CvInvoke.GaussianBlur(gray, gray, new Size(3, 3), 1);

            double cannyThreshold = 180.0;
            double circleAccumulatorThreshold = 120;

            CvInvoke.Canny(gray, cannyEdges, cannyThreshold, circleAccumulatorThreshold);

            CvInvoke.FindContours(cannyEdges, contours, null, RetrType.Tree, ChainApproxMethod.ChainApproxSimple);

            int count = contours.Size;
            for (int i = 0; i < count; i++) {
               using (VectorOfPoint contour = contours[i]) {
                  RotatedRect rect = CvInvoke.MinAreaRect(contour);

                  if (rect.Size.Width > MIN_SIZE && rect.Size.Height > MIN_SIZE) {
                     if (contour.Length > 4) {

                        _holds.Add(new Hold() {
                           Ellipse = CvInvoke.FitEllipse(contour),
                           MinRect = rect,
                           Contour = contour.ToArray()
                        });
                     }
                  }
               }
            }
         }
      }
   }
}
