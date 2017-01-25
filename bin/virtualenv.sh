#!/bin/sh

set -e
set -x

. "$(dirname $0)/config.sh"

virtualenv "$virtualenvdir"
. "$virtualenvdir/bin/activate"
pip install nodeenv
nodeenv -p --prebuilt --node=$nodeversion

deactivate
. "$virtualenvdir/bin/activate"

