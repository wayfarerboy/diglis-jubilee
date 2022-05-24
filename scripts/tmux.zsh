#/bin/zsh

tmux \
  new-session -c $PWD -n "Core" -s "Diglis Jubilee" \; \
  send-keys 'vim' ENTER \; \
  new-window -c $PWD -n "Core server" \; \
  send-keys 'npm run dev' ENTER \; \
  new-window -c $PWD -n "Storybook server" \; \
  send-keys 'npm run storybook' ENTER \; \
  select-pane -t 0 \; \
  select-window -t "Core" \; \
  attach-session -t "Diglis Jubilee"
exit 0
