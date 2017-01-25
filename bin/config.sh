#!/bin/sh

set -e
set -x

cd "$(dirname "$0")"

basedir="$(git rev-parse --show-toplevel)"
cd "$basedir"

# prepare virtualenv + nodeenv from scratch!
nodeversion=6.9.2
virtualenvdir="$basedir/virtualenv"
