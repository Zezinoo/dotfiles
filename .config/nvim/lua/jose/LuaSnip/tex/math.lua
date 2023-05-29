local in_mathzone = function()
    return vim.fn['vimtex#syntax#in_mathzone']() == 1
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
        {
            t("$\\rightarrow$")
        }

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
}
