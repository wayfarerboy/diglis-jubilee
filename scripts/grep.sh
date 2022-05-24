#!/bin/bash

if [ $# -eq 0 ]
then
  echo "No keywords supplied for search"
  exit 1
fi

cd $(dirname "$0")/..
find ./components ./hooks ./pages ./stories ./helpers \
 -type f -exec grep --color -H -r "$1" {} \;
cd $(dirname "$0")

exit 0
