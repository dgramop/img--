echo "using watermark:"
echo $1;
for f in inputs/*; 
do 
	echo $f;
	node test.js $f $1 &
done
