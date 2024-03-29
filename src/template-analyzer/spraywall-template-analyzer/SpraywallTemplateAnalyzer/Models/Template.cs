using Emgu.CV.Structure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SpraywallTemplateAnalyzer.Models {
   public class Template {
      public IEnumerable<SelectableRotatedRect> Elllipses { get; set; }
      public string EncodedImage { get; set; }
      public uint MaxSize { get; set; }
      public uint MinArea { get; set; }
      public uint MaxRatio { get; set; }
   }
}
