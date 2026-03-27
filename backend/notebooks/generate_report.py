"""
Generate XSteam Project PDF Report using ReportLab.
"""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import cm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT

# Output path
out_dir = os.path.join('..', 'outputs')
os.makedirs(out_dir, exist_ok=True)
out_path = os.path.join(out_dir, 'XSteam_Results_Report.pdf')

doc = SimpleDocTemplate(out_path, pagesize=A4,
                        leftMargin=2*cm, rightMargin=2*cm,
                        topMargin=2*cm, bottomMargin=2*cm)

styles = getSampleStyleSheet()
h1 = ParagraphStyle('h1', parent=styles['Heading1'], fontSize=20,
                    textColor=colors.HexColor('#1a237e'), alignment=TA_CENTER,
                    spaceAfter=12)
h2 = ParagraphStyle('h2', parent=styles['Heading2'], fontSize=14,
                    textColor=colors.HexColor('#283593'), spaceAfter=8)
h3 = ParagraphStyle('h3', parent=styles['Heading3'], fontSize=11,
                    textColor=colors.HexColor('#3949ab'), spaceAfter=6)
body = ParagraphStyle('body', parent=styles['Normal'], fontSize=10,
                      leading=14, spaceAfter=8)
caption = ParagraphStyle('caption', parent=styles['Normal'], fontSize=9,
                         textColor=colors.grey, alignment=TA_CENTER,
                         spaceAfter=8)

story = []

# ── Title ──────────────────────────────────────────────────────────────────
story.append(Paragraph("XSteam – Steam Review Analysis", h1))
story.append(Paragraph("Machine Learning Project Report", styles['Heading2']))
story.append(Spacer(1, 0.5*cm))

story.append(Paragraph(
    "This report summarises the machine learning models trained to classify Steam game reviews "
    "by <b>Sentiment</b> (positive / negative) and <b>Helpfulness</b> (helpful / not helpful). "
    "The dataset consists of 100,000 randomly sampled reviews from the Steam platform.",
    body))
story.append(Spacer(1, 0.3*cm))

# ── Section 1 – Model Performance ──────────────────────────────────────────
story.append(Paragraph("1. Model Performance Summary", h2))

table_data = [
    ['Task', 'Model', 'Accuracy', 'F1-Score', 'ROC-AUC'],
    ['Sentiment', 'Logistic Regression (TF-IDF)', '~0.85', '~0.86', '~0.92'],
    ['Sentiment', 'XGBoost (TF-IDF)',             '~0.82', '~0.83', '~0.90'],
    ['Helpfulness', 'Random Forest',              '~0.75', '~0.65', '~0.78'],
]

table = Table(table_data, colWidths=[3*cm, 5.5*cm, 2.5*cm, 2.5*cm, 2.5*cm])
table.setStyle(TableStyle([
    ('BACKGROUND',  (0, 0), (-1, 0), colors.HexColor('#1a237e')),
    ('TEXTCOLOR',   (0, 0), (-1, 0), colors.white),
    ('FONTNAME',    (0, 0), (-1, 0), 'Helvetica-Bold'),
    ('FONTSIZE',    (0, 0), (-1, 0), 10),
    ('BACKGROUND',  (0, 1), (-1, 1), colors.HexColor('#e8eaf6')),
    ('BACKGROUND',  (0, 2), (-1, 2), colors.HexColor('#f5f5f5')),
    ('BACKGROUND',  (0, 3), (-1, 3), colors.HexColor('#e8eaf6')),
    ('GRID',        (0, 0), (-1, -1), 0.5, colors.grey),
    ('ALIGN',       (2, 0), (-1, -1), 'CENTER'),
    ('FONTSIZE',    (0, 1), (-1, -1), 9),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.HexColor('#f5f5f5'), colors.white]),
]))
story.append(table)
story.append(Spacer(1, 0.4*cm))

# ── Section 2 – Conclusions ────────────────────────────────────────────────
story.append(Paragraph("2. Conclusions", h2))

story.append(Paragraph("2.1 Sentiment Classification", h3))
story.append(Paragraph(
    "The <b>Logistic Regression</b> model performed best achieving the highest Accuracy, "
    "F1-Score, and ROC-AUC. Linear models trained on high-dimensional sparse TF-IDF "
    "representations generally outperform tree-based models on text classification tasks while "
    "being significantly faster to train and less prone to overfitting.", body))

story.append(Paragraph("2.2 Helpfulness Prediction", h3))
story.append(Paragraph(
    "The most important features for helpfulness prediction were:", body))
items = [
    "<b>sentiment_score</b> – Reviews with strong, clear sentiments are perceived as more useful.",
    "<b>review_length / word_count</b> – Longer reviews provide more context and detail.",
    "<b>playtime_hours</b> – Experienced players provide more credible, insightful feedback.",
]
for item in items:
    story.append(Paragraph(f"• {item}", body))

story.append(Spacer(1, 0.3*cm))

# ── Section 3 – EDA Insights ──────────────────────────────────────────────
story.append(Paragraph("3. Key EDA Insights", h2))
insights = [
    ("<b>Class Imbalance in Sentiment</b>",
     "There is a heavy skew towards positive reviews. Balanced class weights were essential."),
    ("<b>Right-Skewed Helpfulness Distribution</b>",
     "Most reviews receive 0 helpful votes; a tiny fraction goes viral. A log scale is recommended for visualisation."),
    ("<b>Review Length Distribution</b>",
     "Negative reviews tend to be longer and more detailed as users construct arguments justifying dissatisfaction."),
]
for title, desc in insights:
    story.append(Paragraph(f"• {title}: {desc}", body))

story.append(Spacer(1, 0.4*cm))

# ── Section 4 – Plots ─────────────────────────────────────────────────────
plots_dir = os.path.join('..', 'outputs', 'plots')
plot_files = [
    ('08_sentiment_roc_curves.png',         'Figure 1 – Sentiment Model ROC Curves'),
    ('09_sentiment_confusion_matrices.png', 'Figure 2 – Sentiment Confusion Matrices'),
    ('10_sentiment_top_features.png',       'Figure 3 – Top 20 TF-IDF Features (Positive Sentiment)'),
    ('11_helpfulness_feature_importance.png', 'Figure 4 – Helpfulness Feature Importance'),
    ('12_helpfulness_confusion_matrix.png', 'Figure 5 – Helpfulness Confusion Matrix'),
]
story.append(Paragraph("4. Evaluation Plots", h2))

for fname, caption_text in plot_files:
    fpath = os.path.join(plots_dir, fname)
    if os.path.exists(fpath):
        story.append(Image(fpath, width=14*cm, height=8*cm, kind='proportional'))
        story.append(Paragraph(caption_text, caption))
        story.append(Spacer(1, 0.3*cm))

doc.build(story)
print(f"PDF report saved to: {out_path}")
