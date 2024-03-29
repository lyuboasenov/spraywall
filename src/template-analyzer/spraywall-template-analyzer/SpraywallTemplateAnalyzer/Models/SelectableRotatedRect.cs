using Emgu.CV.Structure;

namespace SpraywallTemplateAnalyzer.Models {
   public class SelectableRotatedRect {
      public RotatedRect RotatedRect { get; set; }
      public bool IsSelected { get; set; }
   }
}
