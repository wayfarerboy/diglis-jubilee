#!/bin/bash

CHANGED_FILES=$(git status -s | grep "^M")

# echo "$CHANGED_FILES" | grep -Fq "firestore.rules"
#if [ "$?" -ne 0 ]
# then
  # echo "Rules unchanged, skipping test"
  # echo
# else
  # npm run test-rules
  # if [ "$?" -ne 0 ]
  # then
    # exit 1
  # fi
  # echo
# fi

echo "$CHANGED_FILES" | grep -qE "(components|stories|helpers|hooks|containers)"
if [ "$?" -ne 0 ]
then
  echo "Components unchanged, skipping test"
  echo
else
  npm test -- --passWithNoTests --testPathIgnorePatterns=storyshots --testPathIgnorePatterns=firestore
  if [ "$?" -ne 0 ]
  then
    echo
    echo "Tests failed. Run:"
    echo "-------------------------------------------"
    echo "npm test -- -testPathIgnorePatterns=storyshots"
    echo "-------------------------------------------"
    echo "to retest before running this commit again."
    echo
    exit 1
  fi
  echo
  echo "Gathering list of stories to test..."
  REGEX="$(node scripts/story-regex.js)"
  if [ -z "$REGEX" ]
  then
    echo "Components unchanged, skipping test"
    echo
  else
    npm run storyshots -- $REGEX
    if [ "$?" -ne 0 ]
    then
      echo
      echo "Tests failed. Serving results..."
      echo "-------------"
      npm run test-results
      echo
      exit 1
    fi
    echo
  fi
fi

echo "$CHANGED_FILES" | grep -qE "(components|helpers|hooks|containers)"
if [ "$?" -ne 0 ]
then
  echo "Extension components unchanged, nothing to copy over"
  echo
else
  npm run extension
  if [ "$?" -ne 0 ]
  then
    exit 1
  fi
  echo
fi

exit 0
