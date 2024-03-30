using System;
using System.Globalization;
using System.Windows.Data;
using System.Windows.Media;

namespace SpraywallTemplateAnalyzer.Wpf {
   internal class ColorToSolidColorBrushConverter : IValueConverter {
      public object Convert(object value, Type targetType, object parameter, CultureInfo culture) {
         if (value is Color c) {
            return new SolidColorBrush(c);
         }
         return value;
      }

      public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture) {
         throw new NotImplementedException();
      }
   }
}
