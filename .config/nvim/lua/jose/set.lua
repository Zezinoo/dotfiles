vim.opt.guicursor = ""


vim.opt.nu = true
vim.opt.relativenumber = true

vim.opt.tabstop = 4
vim.opt.softtabstop = 4
vim.opt.shiftwidth = 4
vim.opt.expandtab = true

vim.opt.smartindent = true

vim.opt.wrap = true

vim.opt.swapfile = false
vim.opt.backup = false
vim.opt.undodir = os.getenv("HOME") .. "/.vim/undodir"
vim.opt.undofile = true

vim.opt.hlsearch = false
vim.opt.incsearch = true

vim.opt.termguicolors = true

vim.opt.scrolloff = 8
vim.opt.signcolumn = "yes"
vim.opt.isfname:append("@-@")

vim.opt.updatetime = 50

vim.opt.colorcolumn = "80"

vim.opt.showtabline = 2

--vim.cmd([[
--set cursorline
--hi cursorline cterm=none term=none
--autocmd WinEnter * setlocal cursorline
--autocmd WinLeave * setlocal nocursorline
--highlight CursorLine guibg=#875fdf ctermbg=126
--]]
--)

-- Folds
vim.cmd([[
set foldmethod=indent
nnoremap <space> za
vnoremap <space> zf
]])
