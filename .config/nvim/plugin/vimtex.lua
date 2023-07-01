vim.g.vimtex_view_method = 'zathura'
vim.g.vimtex_quickfix_mode = 0
vim.g.vimtex_sytax_conceal = 1
vim.cmd([[
let g:vimtex_compiler_latexmk = {
        \ 'executable' : 'latexmk',
        \ 'options' : [
        \   '-xelatex',
        \   '-file-line-error',
        \   '-synctex=1',
        \   '-interaction=nonstopmode',
        \ ],
        \}

]])
