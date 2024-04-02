using System.Collections.Generic;

namespace SpraywallTemplateAnalyzer.Models {
   public class Template {
      public IEnumerable<SelectableHold> Holds { get; set; }
      public string EncodedImage { get; set; }

      public uint MaxSize { get; set; }
      public uint MinArea { get; set; }
      public uint MaxRatio { get; set; }
   }
}
