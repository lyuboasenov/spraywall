using Emgu.CV.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SpraywallTemplateAnalyzer.Models {
   public class ExportTemplate {
      public IEnumerable<RotatedRect> Elllipses { get; set; }
      public string EncodedImage { get; set; }
   }
}
