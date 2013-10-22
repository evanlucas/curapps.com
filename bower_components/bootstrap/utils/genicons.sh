#!/bin/bash

if [[ ! "$1" ]]; then
	echo "Please specify bootstrap.css file"
	exit 1
fi

BS="$1"

if [[ ! -f "$BS" ]]; then
	echo "$BS does not exist."
	exit 1
fi
F="tests/icon-table.jade"
rm "$F"
echo "Generating icons..."
icons=$(cat "$BS" | grep -e '^\.icon\-[a-zA-Z\-]\{0,30\}\:before {' | cut -d : -f 1)
c=0
echo "tr" >> "$F"
for icon in $icons
do
	if [[ $c == 5 ]]; then
		c=0
	fi
	if [[ $c == 0 ]]; then
		echo "tr" >> "$F"
	fi
	if [[ $icon == ".icon-large" ]]; then
		continue
	fi
	c=$(($c+1))
	echo "	td" >> "$F"
	echo "		div.anicon" >> "$F"
	echo "			i$icon" >> "$F"
	echo "			p $icon" >> "$F"
done
