"""
@file hough_lines.py
@brief This program demonstrates line finding with the Hough transform
"""
import sys
import math
import cv2 as cv
import numpy as np
import random

def main(argv):
   size_threshold = 400

   default_file = 'sudoku.png'
   filename = argv[0] if len(argv) > 0 else default_file
   # Loads an image
   src = cv.imread(cv.samples.findFile(filename), cv.IMREAD_GRAYSCALE)
   colorImg = cv.imread(cv.samples.findFile(filename), cv.IMREAD_COLOR)
   # Check if image is loaded fine
   if src is None:
      print ('Error opening image!')
      print ('Usage: hough_lines.py [image_name -- default ' + default_file + '] \n')
      return -1


   blurred = cv.GaussianBlur(src, (5, 5), 1)
   dst = cv.Canny(blurred, 180, 120)

   # Copy edges to the images that will display the results in BGR
   cdst = cv.cvtColor(dst, cv.COLOR_GRAY2BGR)

   # linesP = cv.HoughLinesP(dst, 1, np.pi / 45, 20, None, 30, 10)

   contours, hierarchy = cv.findContours(dst, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)

   approxContours = list()
   ellipses = list()
   rects = list()

   for contour in contours:
      # arcLength = cv.arcLength(contour, True)
      approxContour = cv.approxPolyDP(contour, 10, True)
      approxContourArea = cv.contourArea(approxContour, False)
      rect = cv.minAreaRect(contour)
      (x, y), (width, height), angle = rect
      area = width * height

      if area > 30:
         approxContours.append(approxContour)

         if len(contour) > 4:
            ellipse = cv.fitEllipse(contour)
            (x, y), (MA, ma), angle = ellipse
            if MA < size_threshold and ma < size_threshold:
               ellipses.append(ellipse)
         else:
            rects.append(rect)

   for rect in rects:
      points = cv.boxPoints(rect)
      points = np.int0(points)
      cv.drawContours(color, [points], -1, (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255)), 2)

   for el in ellipses:
      (x, y), (width, height), angle = el
      # color = (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
      color = (0, 255, 255)

      if width > size_threshold or height > size_threshold:
         color = (0, 0, 255)
      cv.ellipse(colorImg, el, color, 2)

   cv.imshow("Detected Lines (in green) - Probabilistic Line Transform", colorImg)

   cv.waitKey()
   return 0

if __name__ == "__main__":
   main(sys.argv[1:])