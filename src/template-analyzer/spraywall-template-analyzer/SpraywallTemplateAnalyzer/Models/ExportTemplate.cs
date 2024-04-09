using System.Collections.Generic;

namespace SpraywallTemplateAnalyzer.Models {
   public class ExportTemplate {
      public IEnumerable<ExportHold> Holds { get; set; }
      public string EncodedImage { get; set; }
   }
}
