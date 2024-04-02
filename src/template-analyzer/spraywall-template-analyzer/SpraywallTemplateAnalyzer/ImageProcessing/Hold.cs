using Emgu.CV.Structure;
using System.Drawing;

namespace SpraywallTemplateAnalyzer.ImageProcessing {
   public class Hold {
      public RotatedRect Ellipse { get; set; }
      public RotatedRect MinRect { get; set; }
      public Point[] Contour { get; set; }
   }
}
