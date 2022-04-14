#!/bin/bash

if [ $# -eq 0 ]
then
  echo "No component specified"
else
  COMPONENT_DIR=$( echo $1 | cut -d '/' -f 1 )
  COMPONENT_FILE=$( echo $1 | cut -d '/' -f 2 )

  if [ "$COMPONENT_DIR" = "$COMPONENT_FILE" ]
  then
    COMPONENT_DIR=""
  fi

  if [ -z "$COMPONENT_FILE" ]
  then
    echo "Component not found"
  else
    CFILE="components/$COMPONENT_DIR/$COMPONENT_FILE.js"
    COMPONENT="$PWD/$CFILE"
    if $( rm $COMPONENT 2> /dev/null )
    then
      echo "✔  \033[0;31m--\033[0m /$CFILE"
    else
      echo "✔  \033[0;31m--\033[0m [SKIPPED] $COMPONENT (not exist)"
    fi
    if [ -z "$COMPONENT_DIR" ]
    then
      rmdir --ignore-fail-on-non-empty $PWD/components/$COMPONENT_DIR 2> /dev/null
    fi

    SFILE="stories/$COMPONENT_DIR/$COMPONENT_FILE.stories.js"
    STORY="$PWD/$SFILE"
    if $( rm $STORY 2> /dev/null )
    then
      echo "✔  \033[0;31m--\033[0m /$SFILE"
    else
      echo "✔  \033[0;31m--\033[0m [SKIPPED] $STORY (not exist)"
    fi
    if [ -z "$COMPONENT_DIR" ]
    then
      rmdir --ignore-fail-on-non-empty $PWD/stories/$COMPONENT_DIR 2> /dev/null
    fi

  fi
fi

exit 0
