default: minify

# top level target
minify: clean
	@echo 'Minifying existing js ...'
	grunt
	@echo 'Cleaning up ...'
	rm -f Resources/html/js/*.concat.js
	@echo 'Finished!'

clean:
	rm -f Resources/html/js/*.concat.js
	rm -f Resources/html/js/*.min.js