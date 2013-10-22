F="tests/navs-gen.jade"
rm -rf $F
genNav() {
	CL="$1"
	echo "		ul.nav$CL" >> $F
	echo "			li.active" >> $F
	echo "				a(href='#') Home" >> $F
	echo "			li" >> $F
	echo "				a(href='#') Profile" >> $F
	echo "			li" >> $F
	echo "				a(href='#') Messages" >> $F
}
echo ".row-fluid" >> $F
echo "	.span5" >> $F
echo "		h3 Tabs" >> $F
genNav ".nav-tabs"
echo "	.span5" >> $F
echo "		h3 Pills" >> $F
genNav ".nav-pills" >> $F
echo ".row-fluid" >> $F
echo "	.span5" >> $F
echo "		h3 Stacked Tabs" >> $F
genNav ".nav-tabs.nav-stacked" >> $F
echo "	.span5" >> $F
echo "		h3 Stacked Pills" >> $F
genNav ".nav-pills.nav-stacked" >> $F


