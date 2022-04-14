from email.policy import default
from urllib import request
from flask import Flask, render_template, url_for, request, redirect
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///test.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)

@app.before_first_request
def create_tables():
    db.create_all()

class MonthlySpending(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    necessities = db.Column(db.Float, nullable=False, default=0)
    luxuries = db.Column(db.Float, nullable=False, default=0)
    savings = db.Column(db.Float, nullable=False, default=0)

    def __repr__(self) -> str:
        return "< Month %r >" % self.id

@app.route("/", methods=["POST", "GET"])
def index():
    if request.method == "POST":
        month_necessities = request.form["m1-necessities"]
        month_luxuries = request.form["m1-luxuries"]
        month_savings = request.form["m1-savings"]
        month_spendings = MonthlySpending(necessities=month_necessities, luxuries=month_luxuries, savings=month_savings)

        try:
            db.session.add(month_spendings)
            print("month spendings added")
            db.session.commit()
            print("changes committed")
            return redirect("/")
        except:
            return "Failed to add monthly spendings"
    else:
        spending_records = MonthlySpending.query.all()
        print("number of records: %r" % len(spending_records))
        return render_template("index.html", records=spending_records, avg_arr=generateBudget())

@app.route('/delete/<int:id>')
def delete(id):
    record_to_delete = MonthlySpending.query.get_or_404(id)

    try:
        db.session.delete(record_to_delete)
        db.session.commit()
        return redirect('/')
    except:
        return 'There was a problem deleting that record'

@app.route('/update/<int:id>', methods=['GET', 'POST'])
def update(id):
    record = MonthlySpending.query.get_or_404(id)

    if request.method == 'POST':
        record.necessities = request.form["m1-necessities"]
        record.luxuries = request.form["m1-luxuries"]
        record.savings = request.form["m1-savings"]

        try:
            db.session.commit()
            return redirect('/')
        except:
            return 'There was an issue updating the record'

    else:
        return render_template('update.html', record=record)

def generateBudget():
    spending_records = MonthlySpending.query.all()
    records_len = len(spending_records)
    total_necessities = 0
    total_luxuries = 0
    total_savings = 0
    
    for record in spending_records:
        total_necessities += record.necessities
        total_luxuries += record.luxuries
        total_savings += record.savings

    if records_len == 0 or (total_necessities == 0 and total_luxuries == 0 and total_savings == 0):
        return None
    
    avg_arr = [["Category", "Amount"], ["Necessities", total_necessities/records_len], ["Luxuries", total_luxuries/records_len], ["Savings", total_savings/records_len]]
    print(avg_arr)
    return avg_arr

if __name__ == "__main__":
    app.run(debug=True)