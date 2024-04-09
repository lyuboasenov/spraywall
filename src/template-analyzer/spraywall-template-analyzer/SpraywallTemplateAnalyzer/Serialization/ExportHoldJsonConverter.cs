using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System;
using System.Drawing;
using SpraywallTemplateAnalyzer.Models;

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
         jo.WriteTo(writer);
      }

      public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer) {
         JObject jo = JObject.Load(reader);
         //return new ExportHold((int) jo["X"], (int) jo["Y"]);
         return new ExportHold();
      }
   }
}
