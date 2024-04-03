using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System;
using System.Drawing;

namespace SpraywallTemplateAnalyzer.Serialization {
   public class PointJsonConverter : JsonConverter {
      public override bool CanConvert(Type objectType) {
         return (objectType == typeof(Point));
      }

      public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer) {
         Point p = (Point) value;
         JObject jo = new JObject {
            { "X", p.X },
            { "Y", p.Y }
         };
         jo.WriteTo(writer);
      }

      public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer) {
         JObject jo = JObject.Load(reader);
         return new Point((int) jo["X"], (int) jo["Y"]);
      }
   }
}
