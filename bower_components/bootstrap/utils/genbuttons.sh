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
F="tests/button-table.jade"
rm "$F"

btnClass() {
	CL="$1"
	echo "tr" >> $F
	TITLE="$CL"
	if [[ "$CL" == "" ]]; then
		TITLE=".btn"
	fi

	echo "	td" >> $F
	echo "		a(href='#').btn.btn-mini$CL $TITLE" >> $F
	echo "	td" >> $F
	echo "		a(href='#').btn.btn-small$CL $TITLE" >> $F
	echo "	td" >> $F
	echo "		a(href='#').btn$CL $TITLE" >> $F
	echo "	td" >> $F
	echo "		a(href='#').btn.btn-large$CL $TITLE" >> $F
	echo "	td" >> $F
	echo "		a(href='#').btn.disabled$CL $TITLE" >> $F
	echo "tr" >> $F
	echo "	td(colspan='3')" >> $F
	echo "		a(href='#').btn.btn-block$CL $TITLE" >> $F
	echo "	td(colspan='2')" >> $F
	echo "		a(href='#').btn.btn-block.disabled$CL $TITLE" >> $F
}

megaBtnClass() {
	CL="$1"
	IC="$2"
#	echo "tr" >> $F
	TITLE="$CL"
	if [[ "$CL" == "" ]]; then
		TITLE=".btn"
	fi

	echo "	td" >> $F
	echo "		a(href='#').btn.btn-mega$CL" >> $F
	echo "			i$IC" >> $F
	echo "			p $IC" >> $F
}

echo "Generating buttons..."

btnClass ""
btnClass ".btn-primary"
btnClass ".btn-info"
btnClass ".btn-warning"
btnClass ".btn-danger"
btnClass ".btn-success"
btnClass ".btn-inverse"

icons=$(cat "$BS" | grep -e '^\.icon\-[a-zA-Z\-]\{3,20\}\:before {' | cut -d : -f 1)

for icon in $icons
do
	if [[ $icon == ".icon-large" ]]; then
		continue
	fi
	echo "tr" >> "$F"
	megaBtnClass "" $icon
	megaBtnClass ".btn-primary" $icon
	megaBtnClass ".btn-info" $icon
	megaBtnClass ".btn-danger" $icon
	megaBtnClass ".btn-inverse" $icon
#	echo "		a(href='#').btn.btn-inverse.btn-mega" >> "$F"
#	echo "			i$icon" >> "$F"
#	echo "			p $icon" >> "$F"
done

