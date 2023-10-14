# app.py
from sklearn.utils import shuffle
from sklearn.metrics import f1_score, accuracy_score, confusion_matrix, classification_report, precision_score, roc_curve
from sklearn.ensemble import RandomForestClassifier
from flask import Flask, request, jsonify, make_response
import joblib
import pandas as pd
import numpy as np
from flask_cors import CORS
import matplotlib.pyplot as plt
from sklearn import metrics
from sklearn.model_selection import train_test_split, KFold, cross_val_score, GridSearchCV
from sklearn.svm import SVC
from sklearn.metrics import f1_score, accuracy_score, confusion_matrix, classification_report, precision_score, roc_curve
import seaborn as sns
from sklearn.utils import shuffle
from sklearn.linear_model import LogisticRegression, Perceptron, RidgeClassifier, SGDClassifier
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier, ExtraTreesClassifier
from sklearn.ensemble import BaggingClassifier, AdaBoostClassifier, VotingClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.tree import DecisionTreeClassifier

app = Flask(__name__, static_url_path='', static_folder='static')
CORS(app)

# %%
df = pd.read_csv(
    './dataset.csv')
df = shuffle(df, random_state=43)
df.head()

# %% [markdown]
# **Removing Hyphen from strings**

# %%
for col in df.columns:

    df[col] = df[col].str.replace('_', ' ')
df.head()

# %% [markdown]
# **Dataset characteristics**

# %%
df.describe()

# %% [markdown]
# **Check for null and NaN values**

# %%
null_checker = df.apply(lambda x: sum(x.isnull())).to_frame(name='count')
print(null_checker)

# %%
plt.figure(figsize=(10, 5))
plt.plot(null_checker.index, null_checker['count'])
plt.xticks(null_checker.index, null_checker.index, rotation=45,
           horizontalalignment='right')
plt.title('Before removing Null values')
plt.xlabel('column names')
plt.margins(0.1)
plt.show()

# %% [markdown]
# **Remove the trailing space from the symptom columns**

# %%
cols = df.columns
data = df[cols].values.flatten()

s = pd.Series(data)
s = s.str.strip()
s = s.values.reshape(df.shape)

df = pd.DataFrame(s, columns=df.columns)
df.head()

# %% [markdown]
# **Fill the NaN values with zero**

# %%
df = df.fillna(0)
df.head()

# %% [markdown]
# **Symptom severity rank**

# %%
df1 = pd.read_csv(
    './Symptom-severity.csv')
df1['Symptom'] = df1['Symptom'].str.replace('_', ' ')
df1.head()

# %% [markdown]
# **Get overall list of symptoms**

# %%
df1['Symptom'].unique()

# %% [markdown]
# **Encode symptoms in the data with the symptom rank**

# %%
vals = df.values
symptoms = df1['Symptom'].unique()

for i in range(len(symptoms)):
    vals[vals == symptoms[i]] = df1[df1['Symptom']
                                    == symptoms[i]]['weight'].values[0]

d = pd.DataFrame(vals, columns=cols)
d.head()

# %% [markdown]
# **Assign symptoms with no rank to zero**

# %%
d = d.replace('dischromic  patches', 0)
d = d.replace('spotting  urination', 0)
df = d.replace('foul smell of urine', 0)
df.head(10)

# %% [markdown]
# **Check if entire columns have zero values so we can drop those values**

# %%
null_checker = df.apply(lambda x: sum(x.isnull())).to_frame(name='count')
print(null_checker)

# %%
plt.figure(figsize=(10, 5))
plt.plot(null_checker.index, null_checker['count'])
plt.xticks(null_checker.index, null_checker.index, rotation=45,
           horizontalalignment='right')
plt.title('After removing Null values')
plt.xlabel('column names')
plt.margins(0.01)
plt.show()

# %%
print("Number of symptoms used to identify the disease ",
      len(df1['Symptom'].unique()))
print("Number of diseases that can be identified ",
      len(df['Disease'].unique()))

# %% [markdown]
# **Get the names of diseases from data**

# %%
df['Disease'].unique()

# %% [markdown]
# ### Select the features as symptoms column and label as Disease column
#
# Explination: A **feature** is an input; **label** is an output.
# A feature is one column of the data in your input set. For instance, if you're trying to predict the type of pet someone will choose, your input features might include age, home region, family income, etc. The label is the final choice, such as dog, fish, iguana, rock, etc.
#
# Once you've trained your model, you will give it sets of new input containing those features; it will return the predicted "label" (pet type) for that person.

# %%
data = df.iloc[:, 1:].values
labels = df['Disease'].values

# %% [markdown]
# ## Splitting the dataset to training (80%) and testing (20%)
#
# Separating data into training and testing sets is an important part of evaluating data mining models. Typically, when you separate a data set into a training set and testing set, most of the data is used for training, and a smaller portion of the data is used for testing. By using similar data for training and testing, you can minimize the effects of data discrepancies and better understand the characteristics of the model.
# After a model has been processed by using the training set, we test the model by making predictions against the test set. Because the data in the testing set already contains known values for the attribute that you want to predict, it is easy to determine whether the model's guesses are correct.
#
# * Train Dataset: Used to fit the machine learning model.
# * Test Dataset: Used to evaluate the fit machine learning model.

# %%
x_train, x_test, y_train, y_test = train_test_split(
    data, labels, train_size=0.8, random_state=42)
print(x_train.shape, x_test.shape, y_train.shape, y_test.shape)

# %% [markdown]
# ### Compute the F1 score, also known as balanced F-score or F-measure.
#
# The F1 score can be interpreted as a weighted average of the precision and
# recall, where an F1 score reaches its best value at 1 and worst score at 0.
# The relative contribution of precision and recall to the F1 score are
# equal. The formula for the F1 score is
#
#     F1 = 2 * (precision * recall) / (precision + recall)

# %% [markdown]
# # Decision Tree

# %%
tree = DecisionTreeClassifier(criterion='gini', random_state=42, max_depth=13)
tree.fit(x_train, y_train)
preds = tree.predict(x_test)
conf_mat = confusion_matrix(y_test, preds)
df_cm = pd.DataFrame(
    conf_mat, index=df['Disease'].unique(), columns=df['Disease'].unique())
print('F1-score% =', f1_score(y_test, preds, average='macro') *
      100, '|', 'Accuracy% =', accuracy_score(y_test, preds)*100)
sns.heatmap(df_cm)

# %%
kfold = KFold(n_splits=10, shuffle=True, random_state=42)
DS_train = cross_val_score(tree, x_train, y_train,
                           cv=kfold, scoring='accuracy')
pd.DataFrame(DS_train, columns=['Scores'])
print("Mean Accuracy: %.3f%%, Standard Deviation: (%.2f%%)" %
      (DS_train.mean()*100.0, DS_train.std()*100.0))

# %%
kfold = KFold(n_splits=10, shuffle=True, random_state=42)
DS_test = cross_val_score(tree, x_test, y_test, cv=kfold, scoring='accuracy')
pd.DataFrame(DS_test, columns=['Scores'])
print("Mean Accuracy: %.3f%%, Standard Deviation: (%.2f%%)" %
      (DS_test.mean()*100.0, DS_test.std()*100.0))

# %% [markdown]
# # Random Forest

# %%
rfc = RandomForestClassifier(random_state=42)

# %%
rnd_forest = RandomForestClassifier(
    random_state=42, max_features='sqrt', n_estimators=500, max_depth=13)
rnd_forest.fit(x_train, y_train)
preds = rnd_forest.predict(x_test)
conf_mat = confusion_matrix(y_test, preds)
df_cm = pd.DataFrame(
    conf_mat, index=df['Disease'].unique(), columns=df['Disease'].unique())
print('F1-score% =', f1_score(y_test, preds, average='macro') *
      100, '|', 'Accuracy% =', accuracy_score(y_test, preds)*100)
sns.heatmap(df_cm)

# %%
kfold = KFold(n_splits=10, shuffle=True, random_state=42)
rnd_forest_train = cross_val_score(
    rnd_forest, x_train, y_train, cv=kfold, scoring='accuracy')
pd.DataFrame(rnd_forest_train, columns=['Scores'])
print("Mean Accuracy: %.3f%%, Standard Deviation: (%.2f%%)" %
      (rnd_forest_train.mean()*100.0, rnd_forest_train.std()*100.0))

# %%
kfold = KFold(n_splits=10, shuffle=True, random_state=42)
rnd_forest_test = cross_val_score(
    rnd_forest, x_test, y_test, cv=kfold, scoring='accuracy')
pd.DataFrame(rnd_forest_test, columns=['Scores'])
print("Mean Accuracy: %.3f%%, Standard Deviation: (%.2f%%)" %
      (rnd_forest_test.mean()*100.0, rnd_forest_test.std()*100.0))

# %% [markdown]
# # Fucntion to manually test the models

# %%
discrp = pd.read_csv(
    "./symptom_Description.csv")

# %%
discrp.head()

# %%
ektra7at = pd.read_csv(
    "./symptom_precaution.csv")

# %%
ektra7at.head()

# %% [markdown]
# **Save Random Forest model**

# %%
# save
joblib.dump(rfc, "random_forest.joblib")

# %% [markdown]
# **Load Model**

# %%
# load, no need to initialize the loaded_rf
loaded_rf = joblib.load("random_forest.joblib")

# %%


def predd(x, symptoms):

    psymptoms = [0]*17
    for i in range(len(symptoms)):
        psymptoms[i] = symptoms[i]
    a = np.array(df1["Symptom"])
    b = np.array(df1["weight"])
    for j in range(len(psymptoms)):
        for k in range(len(a)):
            if psymptoms[j] == a[k]:
                psymptoms[j] = b[k]
    psy = [psymptoms]
    pred2 = x.predict(psy)
    disp = discrp[discrp['Disease'] == pred2[0]]
    disp = disp.values[0][1]
    recomnd = ektra7at[ektra7at['Disease'] == pred2[0]]
    c = np.where(ektra7at['Disease'] == pred2[0])[0][0]
    precuation_list = []
    for i in range(1, len(ektra7at.iloc[c])):
        precuation_list.append(ektra7at.iloc[c, i])
    print("The Disease Name: ", pred2[0])
    print("The Disease Discription: ", disp)
    print("Recommended Things to do at home: ")
    for i in precuation_list:
        print(i)

    result = {
        "Disease": pred2[0],
        "Disease_Description": disp,
        "Precautions": precuation_list
    }
    return result

# %% [markdown]
# # Comparison between algorithms testing and training


# %%
n_groups = 2
algorithms = ('Decision Tree', 'Random Forest')
train_accuracy = (DS_train.mean()*100.0,
                  rnd_forest_train.mean()*100.0,)

# %%
test_accuracy = (DS_test.mean()*100.0,
                 rnd_forest_test.mean()*100.0)

# %%
Standard_Deviation = (DS_test.std()*100.0,
                      rnd_forest_test.std()*100.0)

# %%
# create plot
fig, ax = plt.subplots(figsize=(15, 10))
index = np.arange(n_groups)
bar_width = 0.3
opacity = 1
rects1 = plt.bar(index, train_accuracy, bar_width,
                 alpha=opacity, color='Cornflowerblue', label='Train')
rects2 = plt.bar(index + bar_width, test_accuracy, bar_width,
                 alpha=opacity, color='Teal', label='Test')
rects3 = plt.bar(index + bar_width, Standard_Deviation, bar_width,
                 alpha=opacity, color='red', label='Standard Deviation')
plt.xlabel('Algorithm')  # x axis label
plt.ylabel('Accuracy (%)')  # y axis label
plt.ylim(0, 115)
plt.title('Comparison of Algorithm Accuracies')  # plot title
plt.xticks(index + bar_width * 0.5, algorithms)  # x axis data labels
plt.legend(loc='upper right')  # show legend
for index, data in enumerate(train_accuracy):
    plt.text(x=index - 0.035, y=data + 1,
             s=round(data, 2), fontdict=dict(fontsize=8))
for index, data in enumerate(test_accuracy):
    plt.text(x=index + 0.25, y=data + 1,
             s=round(data, 2), fontdict=dict(fontsize=8))
for index, data in enumerate(Standard_Deviation):
    plt.text(x=index + 0.25, y=data + 1,
             s=round(data, 2), fontdict=dict(fontsize=8))


@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        try:
            data = request.get_json()
            symptoms = data.get("symptoms")
            pred_result = predd(rnd_forest, symptoms)
            response = jsonify(pred_result)
            response.headers.add("Access-Control-Allow-Origin", "*")
            response.headers.add(
                "Access-Control-Allow-Headers", "Content-Type, Authorization")
            response.headers.add("Access-Control-Allow-Methods", "POST")
            return response
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({})


try:
    data = pd.read_csv('./Symptom-severity.csv')
except FileNotFoundError:
    print("Error: Dataset file not found.")
    data = pd.DataFrame()  # Create an empty DataFrame

# Convert the loaded dataset to a list of dictionaries
data_list = data.to_dict(orient='records')


@app.route('/symptoms', methods=['GET'])
def get_data():
    return jsonify(data_list)


if __name__ == "__main__":
    app.run()
