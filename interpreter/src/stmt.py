from __future__ import annotations

from dataclasses import dataclass

from src.expr import Expr

type Stmt = Expression | Print


@dataclass
class Expression:
    expression: Expr


@dataclass
class Print:
    expression: Expr
