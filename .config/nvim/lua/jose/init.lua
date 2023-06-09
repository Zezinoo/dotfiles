require("jose.remap")
require("jose.set")
require("jose.diagnostics")


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

--vim.cmd(
--    "set stl=>>>%{vimcaps#statusline(1)}>>>"
--)

--Spell check options
--
vim.opt.spelllang = 'pt,en_gb'
vim.cmd("autocmd FileType latex,tex,md,markdown setlocal spell")

vim.cmd("set stl=>>>%{vimcaps#statusline(N)}<<<")
--
require("statusline")
-- Course specific snippets
vim.cmd("set rtp+=~/university/current-course")
