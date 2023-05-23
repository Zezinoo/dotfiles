require("jose.remap")
require("jose.set")
vim.g.netrw_browse_split = 0

vim.g.netrw_browse_split = 0

local augroup = vim.api.nvim_create_augroup
local autocmd = vim.api.nvim_create_autocmd
local yank_group = augroup('HighlightYank', {})

function R(name)
    require("plenary.reload").reload_module(name)
end

autocmd('TextYankPost', {
    group = yank_group,
    pattern = '*',
    callback = function()
        vim.highlight.on_yank({
            higroup = 'IncSearch',
            timeout = 40,
        })
    end,
})


vim.g.netrw_browse_split = 0
vim.g.netrw_banner = 0
vim.g.netrw_winsize = 25
vim.g.tex_flavor = 'latex'
vim.cmd(
    "set stl=...%{vimcaps#statusline(1)}..."
)
--Spell check option
vim.opt.spelllang = 'pt,en_gb'
vim.cmd([[
hi clear SpellBad
hi SpellBad cterm=underline
hi SpellCap ctermfg=Gray ctermbg=Blue
hi SpellBad ctermfg=Gray ctermbg=DarkRed
]])
vim.cmd("autocmd FileType latex,tex,md,markdown setlocal spell")
vim.g.tex_conceal = 'abdmg'
