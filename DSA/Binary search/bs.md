| Pattern        | Validity Graph | If valid(mid)    | Return |
| -------------- | -------------- | ---------------- | ------ |
| Minimum Answer | F F F T T T    | `high = mid - 1` | `low`  |
| Maximum Answer | T T T F F F    | `low = mid + 1`  | `high` |

When reading a question ask:

"If mid works, which direction am I interested in?"

If mid works and I want a smaller answer
high = mid - 1

Examples:

Koko
Ship Packages
Allocate Books
Split Array Largest Sum

Return: low

If mid works and I want a larger answer
low = mid + 1

Examples:

Aggressive Cows
Magnetic Force Between Balls

Return: high