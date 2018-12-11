var showdown = require('showdown');
// import hljs from 'highlight.js/lib/highlight';


var converter = new showdown.Converter({
    extensions: function () {
        function htmlunencode(text) {
            return (
                text
                    .replace(/&amp;/g, '&')
                    .replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>')
            );
        }

        return [
            {
                type: 'output',
                filter: function (text, converter, options) {
                    // use new shodown's regexp engine to conditionally parse codeblocks
                    var left = '<pre><code\\b[^>]*>',
                        right = '</code></pre>',
                        flags = 'g',
                        replacement = function (wholeMatch, match, left, right) {
                            // unescape match to prevent double escaping
                            match = htmlunencode(match);
                            // highlightBlock highlightAuto
                            return left + hljs.highlightAuto(match).value + right;
                        };
                    return showdown.helper.replaceRecursiveRegExp(text, replacement, left, right, flags);
                }
            }
        ];
    }()
});

export function mkToHmtl(value) {
    var val = converter.makeHtml(value);
    return val
}

export function hightLight(dom) {
    $(dom).find('pre code').each((i, block) => {
        hljs.highlightBlock(block);
    })

}