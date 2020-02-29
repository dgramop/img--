const { Image } = require('image-js');
const fs=require("fs")
let marked, unmarked,input,output,watermark;

//we're in the buisiness of extracting watermarks:
Image.load(process.argv[5] || __dirname+'/marked.png').then(function (image) {
//  marked = image
  marked = image.resize({factor:1200/image.width}).crop({x:0,y:Math.abs(1500-image.height)/2,width:1200,height:1500})

});
Image.load(process.argv[4] || __dirname+'/unmarked.png').then(function (image) {
//  unmarked = image
  unmarked = image.resize({factor:1200/image.width}).crop({x:0,y:Math.abs(1500-image.height)/2,width:1200,height:1500})
});


Image.load(process.argv[2]).then(function (image) {

  input = image.resize({factor:1200/image.width})
  input=input.crop({x:0,y:Math.abs(1500-image.height)/2,width:1200,height:1500})
  output = Image.createFrom(input)
  console.log(input)
});
if(process.argv[3]=="gen") watermark=new Image(1200,1500)
else Image.load(process.argv[3]=="gen" ? "watermark.png" : (process.argv[3]!=null ? process.argv[3] : "watermark.png" ) ).then(function (image) {
	watermark=image;
});

const greyscale=true;

setTimeout(function(){

for(let x=0;x<1200;x++)
{
	for(let y=0;y<1500;y++)
	{
		let m=marked.getPixelXY(x,y);
		let u=unmarked.getPixelXY(x,y)
		let i=input.getPixelXY(x,y)
		let w=watermark.getPixelXY(x,y)
		if(Math.abs((m[0]-u[0]))>30 || Math.abs((m[1]-u[1]))>30 || Math.abs((m[2]-u[2]))>30 || (process.argv[3]!="gen" && (w[0]>30 || w[1]>30 || w[2]>30)))
		{
			console.log("x: "+x+" y: "+y+" "+u[3])
		} //else continue
		if(process.argv[3]=="gen" )
		{
			output.setPixelXY(x,y, [i[0]-(m[0]-u[0]),i[1]-(m[1]-u[1]),i[2]-(m[2]-u[2]), i[3]-(m[3]-u[3]) ])
			/*if((Math.abs((m[0]-u[0])-(m[1]-u[1]))<15 && Math.abs((m[1]-u[1])-(m[2]-u[2]))<15 && Math.abs((m[2]-u[2])-(m[0]-u[0]))<15) || !greyscale)*/
			watermark.setPixelXY(x,y, [(m[0]-u[0]),(m[1]-u[1]),(m[2]-u[2]), 255 ])
		}
		else
		{
			output.setPixelXY(x,y, [i[0]-(w[0]),i[1]-(w[1]),i[2]-(w[2]), /*i[3]-(w[3])*/255 ])
		}

	}
}
let sp=process.argv[2].split(".")
output.save("output_"+sp[sp.length-2].substring(sp[sp.length-2].lastIndexOf("/")+1)+".png")
if(process.argv[3]=="gen")watermark.save("watermark.png")
},4000)

