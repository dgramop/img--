# Watermark removal tool
By Dhruv Gramopadhye

Usage:
node test.js <input image>

produces output.png, the image with the watermark removed.

In the directory, you must have marked.png and unmarked.png, where marked.png is an image that does not have the watermark and unmarked.png is the same image as marked.png, but without the watermark.

The program will take the difference of marked and unmarked to produce the watermark, and then will apply that difference to input filename supplied in the command line argument and then produce output.png

