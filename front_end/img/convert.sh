for f in front-{1..151}.gif; do
  convert -layers coalesce "$f" temp.gif
  montage temp.gif -tile x1 -geometry +0+0  -alpha On -background "rgba(0, 0, 0, 0.0)" -quality 100 "$f.png"
done
for i in front-{1..151}.gif; do
  convert -layers coalesce "$f" temp.gif
  montage temp.gif -tile x1 -geometry +0+0  -alpha On -background "rgba(0, 0, 0, 0.0)" -quality 100 "$f.png"
done

