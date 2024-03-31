using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System;
using System.Drawing;

namespace SpraywallTemplateAnalyzer.Serialization {
   public class SizeJsonConverter : JsonConverter {
      public override bool CanConvert(Type objectType) {
         return (objectType == typeof(SizeF));
      }

      public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer) {
         SizeF size = (SizeF) value;
         JObject jo = new JObject();
         jo.Add("Width", size.Width);
         jo.Add("Height", size.Height);
         jo.WriteTo(writer);
      }

      public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer) {
         JObject jo = JObject.Load(reader);
         return new SizeF((int) jo["Width"], (int) jo["Height"]);
      }
   }
}
