
# Path to your oh-my-zsh installation.
export ZSH="$HOME/.oh-my-zsh"

ZSH_THEME="robbyrussell"
### PLUGINS ####
plugins=(git zsh-syntax-highlighting)

source $ZSH/oh-my-zsh.sh

### ALIASES ###
alias vim="nvim"	
alias cl="clear"
alias sl="swallow"
alias lo="git log --oneline --graph --all"
alias so="source ~/.zshrc"
### MISC ###
#Sourcing geometry theme
source ~/Documents/zsh_themes/geometry/geometry.zsh

#Setting path symlinks
cdpath=~/.paths
#Sourcing profile for bin scripts

source ~/.profile
alias config='/usr/bin/git --git-dir=/home/jalves/.cfg/ --work-tree=/home/jalves'

#Changing LS COLORS
export LS_COLORS="$LS_COLORS:di=01;97"

#Adding stuff to path
export PATH="$PATH:/home/jalves/julia-1.9.0/bin"

# zsh-bd
. $HOME/.zsh/plugins/bd/bd.zsh
#CD tab completion colors
zstyle ':completion:*' list-colors dircolors
autoload -Uz compinit
compinit
 xset r rate 300 50

source /usr/share/colcon_argcomplete/hook/colcon-argcomplete.zsh
source /opt/ros/iron/setup.zsh

#source /home/jalves/Documents/Code/ros2_ws/install/setup.zsh
#source /home/jalves/Documents/Code/eracing/ros_dump/ros/workspace/install/setup.zsh

#complete -o nospace -o default -F _python_argcomplete "ros2"

export PATH=/usr/local/texlive/2023/bin/x86_64-linux:$PATH
# vim bindings
bindkey -v
xrandr --output DP-1 --right-of eDP-1
export PATH="$PATH:/usr/local/bin"
source /opt/ros/iron/setup.zsh
