local in_mathzone = function()
    return vim.fn['vimtex#syntax#in_mathzone']() == 1
end
local not_mathzone = function()
    return not (vim.fn['vimtex#syntax#in_mathzone']() == 1)
end
return {
    -- Examples of Greek letter snippets, autotriggered for efficiency
    s({ trig = ";a", snippetType = "autosnippet" },
        {
            t("\\alpha"),
        }
    ),
    s({ trig = ";b", snippetType = "autosnippet" },
        {
            t("\\beta"),
        }
    ),
    s({ trig = ";g", snippetType = "autosnippet" },
        {
            t("\\gamma"),
        }
    ),
    s({ trig = "->", snippetType = "autosnippet" },
        { t("$\\rightarrow$") },
        { condition = not_mathzone }
    ),
    s({ trig = "->", snippetType = "autosnippet" },
        { t("\\rightarrow") },
        { condition = in_mathzone }
    ),
    s({ trig = "<-", snippetType = "autosnippet" },
        { t("\\leftarrow") },
        { condition = in_mathzone }
    ),
    s({ trig = "<-", snippetType = "autosnippet" },
        { t("$\\leftarrow$") },
        { condition = not_mathzone }
    ),
    s({ trig = "cint", snippetType = "autosnippet" },
        fmta(
            "\\oint_{<>}",
            { i(1), }
        ),
        { condition = in_mathzone }
    ),
    s({ trig = "rho", snippetType = "autosnippet" },
        { t("\\rho") }
    ),
    s({ trig = "dot", snippetType = "autosnippet" },
        { t("\\cdot") }
    ),
    s({ trig = "cases", snippetType = "autosnippet" },
        fmta(
            [[
        \begin{cases}
             <>
        \end{cases}
        ]]
            , { i(0) }
        ),
        { condition = in_mathzone }
    ),
    s({ trig = "imp", snippetType = "autosnippet" },
        { t("\\implies") },
        { condition = in_mathzone }
    ),
    s({ trig = "psi", snippetType = "autosnippet" },
        { t("\\psi") },
        { condition = in_mathzone }
    ),
    s({ trig = "hsl", snippetType = "autosnippet" },
        { t("\\hslash") },
        { condition = in_mathzone }
    ),
    s({ trig = "eqsch", snippetType = "autosnippet" },
        { t("\\hslash") },
        { condition = in_mathzone }
    ),



}
