using Emgu.CV.Structure;
using System.Drawing;

namespace SpraywallTemplateAnalyzer.ImageProcessing {
   public class Hold {
      public RotatedRect MinRect { get; set; }
      public Point[] Contour { get; set; }
      public Point Center { get; set; }
      public uint Radius { get; set; }
      public uint Index { get; set; }
   }
}
