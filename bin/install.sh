#!/bin/sh

set -e
set -x

. "$(dirname $0)/config.sh"

if test '!' -e "$virtualenvdir/bin/activate"
then
    echo "Could not find virtualenv!" >&2
    echo "Run virtualenv.sh first." >&2
    exit 1
fi

. "$virtualenvdir/bin/activate"

npm install -g bower testem ember-cli
