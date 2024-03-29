using Emgu.CV.CvEnum;
using Emgu.CV.Structure;
using Emgu.CV.Util;
using Emgu.CV;
using System.Collections.Generic;

namespace SpraywallTemplateAnalyzer.ImageProcessing {
   internal class TemplateProcessor {
      private string _imgLocation;
      private const int MIN_SIZE = 10;
      private List<RotatedRect> _rects = new List<RotatedRect>();
      private List<RotatedRect> _ellipses = new List<RotatedRect>();

      public int MaxSize { get; set; }
      public int MinArea { get; set; }
      public int MaxRatio { get; set; }

      public IEnumerable<RotatedRect> Ellipses { get {  return _ellipses; } }

      private TemplateProcessor(string imgLocation) {
         _imgLocation = imgLocation;
      }

      public static TemplateProcessor Process(string imgLocation) {
         var processor = new TemplateProcessor(imgLocation);
         using (var imgMatrix = new Mat(processor._imgLocation))
            processor.ProcessImage(imgMatrix);

         return processor;
      }

      private void ProcessImage(Mat img) {
         using (UMat gray = new UMat())
         using (UMat cannyEdges = new UMat())
         using (VectorOfVectorOfPointF contours = new VectorOfVectorOfPointF()) {
            //Convert the image to grayscale and filter out the noise
            CvInvoke.CvtColor(img, gray, ColorConversion.Bgr2Gray);

            //Remove noise
            CvInvoke.GaussianBlur(gray, gray, new System.Drawing.Size(5, 5), 1);

            #region circle detection
            double cannyThreshold = 180.0;
            double circleAccumulatorThreshold = 120;

            CvInvoke.Canny(gray, gray, cannyThreshold, circleAccumulatorThreshold);

            CvInvoke.FindContours(gray, contours, null, RetrType.Tree, ChainApproxMethod.ChainApproxSimple);

            int count = contours.Size;
            for (int i = 0; i < count; i++) {
               using (VectorOfPointF contour = contours[i]) {
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
