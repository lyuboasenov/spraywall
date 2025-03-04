using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System;
using System.Drawing;
using SpraywallTemplateAnalyzer.Models;
using Emgu.CV.Structure;
using System.Collections.Generic;
using System.Linq;

namespace SpraywallTemplateAnalyzer.Serialization {
   public class ExportHoldJsonConverter : JsonConverter {
      public override bool CanConvert(Type objectType) {
         return (objectType == typeof(ExportHold));
      }

      public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer) {
         ExportHold h = (ExportHold) value;
         JObject jo = new JObject {
            //{ "X", p.X },
            //{ "Y", p.Y }
         };

         JArray joArray = new JArray {
            PointToArray(h.Center),
            h.Radius,
            RotatedRectToArray(h.MinRect),
            PointsToArray(h.Contour),
            h.Index
         };

         joArray.WriteTo(writer);
      }

      public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer) {
         throw new NotSupportedException();
      }

      private JArray PointToArray(Point p) { return new JArray(p.X, p.Y); }
      private JArray PointsToArray(IEnumerable<Point> p) { return new JArray(p.Select(PointToArray).ToArray()); }
      private JArray RotatedRectToArray(RotatedRect r) { 
         return new JArray(
            new JArray((int)r.Center.X, (int)r.Center.Y),
            new JArray((int) r.Size.Width, (int) r.Size.Height),
            (int) r.Angle
            ); 
      }
   }
}
