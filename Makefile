default: minify

# top level target
minify: clean
	@echo 'Minifying existing js ...'
	grunt
	@echo 'Cleaning up ...'
	rm -f Resources/html/js/logic.concat.js
	@echo 'Finished!'

clean:
	rm -f Resources/html/js/logic.concat.js
	rm -f Resources/html/js/logic.min.js