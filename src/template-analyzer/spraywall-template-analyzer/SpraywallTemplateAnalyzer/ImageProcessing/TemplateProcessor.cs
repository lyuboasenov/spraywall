using Emgu.CV.CvEnum;
using Emgu.CV.Structure;
using Emgu.CV.Util;
using Emgu.CV;
using System.Collections.Generic;
using System.Linq;
using System.Diagnostics;

namespace SpraywallTemplateAnalyzer.ImageProcessing {
   internal class TemplateProcessor {
      private string _imgLocation;
      private const int MIN_SIZE = 10;
      private List<RotatedRect> _rects = new List<RotatedRect>();
      private List<RotatedRect> _ellipses = new List<RotatedRect>();

      public uint MaxSize { get; set; } = 400;
      public uint MinArea { get; set; } = 164;
      public uint MaxRatio { get; set; } = 4;

      public IEnumerable<RotatedRect> Ellipses { get {  return _ellipses; } }
      public IEnumerable<RotatedRect> FilteredEllipses { get {  return _ellipses.Where(IsValid); } }

      private TemplateProcessor(string imgLocation) {
         _imgLocation = imgLocation;
      }

      public static TemplateProcessor Process(string imgLocation) {
         var processor = new TemplateProcessor(imgLocation);
         processor.ProcessImage();

         return processor;
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
            CvInvoke.GaussianBlur(gray, gray, new System.Drawing.Size(3, 3), 1);

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
                        _ellipses.Add(CvInvoke.FitEllipse(contour));
                     } else {
                        _rects.Add(rect);
                     }
                  }
               }
            }
         }
      }
   }
}
