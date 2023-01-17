import toml

print("\nThis will create/overwrite config.toml file required by the program.\nYou can press enter to use the given (default) value for each key.")

d = toml.load("config.example.toml")
data = ""
for k in d.keys():
    v = input(f"{k} ({d[k]}) = ")
    data = f"{data}{k} = \"{v or d[k]}\"\n"

if input("\nConfirm? (y/n) ").lower() != "y":
    print("Aborted.\n")
    exit(0)

print("\nYou may check config.toml file to ensure that it is setup properly.\n")

with open("config.toml", "w") as f:
    f.write(data)

