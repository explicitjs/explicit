![build status](https://travis-ci.org/explicitjs/explicit.svg?branch=master)
[![Code Climate](https://codeclimate.com/github/explicitjs/explicit/badges/gpa.svg)](https://codeclimate.com/github/explicitjs/explicit)

# Explicit.js

Explicit.js allows you to explicitly annotate, document and augment your methods.

```bash
npm i explicit joi -S
```

## Usage

```JavaScript
var explicit = require("explicit"),
    joi = require("joi");

var object = explicit({
    foo: {
        $args: [
            joi.string().meta("bar")
        ],
        $: function (bar) {
            console.info(bar);
        }
    }
});

object.foo(1); // should print "1"
object.foo.valid(1); // will fail because the first argument is not allowed to be a string
object.foo.validObject({
    bar: "Hello World"
}); // should print "Hello World"
```

You can also add the ```$one``` parameter for single definitions.

```JavaScript
var foo = explicit({
    $one: true,   
    $args: [
        joi.string().meta("bar")
    ],
    $: function (bar) {
        console.info(bar);
    }
});

foo(1); // should print "1"
foo.valid(1); // will fail because the first argument is not allowed to be a string
foo.validObject({
    bar: "Hello World"
}); // should print "Hello World"
```
