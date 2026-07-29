import pandas as pd
from sklearn.model_selection import train_test_split
import torch

# data
df = pd.read_csv("data/house_data.csv")
print(df.head())

# * * * preprocessing * * *
# select features
features = [
    "bedrooms",
    "bathrooms",
    "sqft_living",
    "yr_built",
]

target = "price"

X = df[features]
y = df[target]

print(X.head())
print(y.head())

# split train / test data
# 80%: train, 20%: test
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# convert to tensor
X_train = torch.tensor(
    X_train.values,
    dtype=torch.float32
)

y_train = torch.tensor(
    y_train.values,
    dtype=torch.float32
).view(-1, 1)

