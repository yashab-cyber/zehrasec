#!/usr/bin/env python3
"""
Site validation script for ZehraSec
Checks for consistency across all HTML pages
"""

import os
import re
from pathlib import Path

def check_file_consistency():
    """Check all HTML files for consistency"""
    html_files = list(Path('.').glob('*.html'))
    issues = []
    
    # Expected patterns
    expected_patterns = {
        'doctype': r'<!DOCTYPE html>',
        'matrix_bg': r'<div class="matrix-bg" id="matrix-bg"></div>',
        'nav_logo': r'<div class="nav-logo">',
        'shield_icon': r'<i class="fas fa-shield-virus"></i>',
        'hamburger_bar': r'<span class="bar"></span>',
        'font_import': r'JetBrains\+Mono',
        'fontawesome': r'font-awesome/6\.0\.0',
        'manifest': r'manifest\.json',
        'favicon': r'favicon\.svg'
    }
    
    print("🔍 Validating ZehraSec website consistency...\n")
    
    for html_file in html_files:
        print(f"📄 Checking {html_file.name}...")
        
        try:
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Check for DOCTYPE
            if not re.search(expected_patterns['doctype'], content):
                issues.append(f"{html_file.name}: Missing or incorrect DOCTYPE")
            
            # Check for matrix background
            if not re.search(expected_patterns['matrix_bg'], content):
                issues.append(f"{html_file.name}: Inconsistent matrix background element")
            
            # Check for nav logo structure
            if not re.search(expected_patterns['nav_logo'], content):
                issues.append(f"{html_file.name}: Inconsistent navigation logo structure")
            
            # Check for shield icon
            if not re.search(expected_patterns['shield_icon'], content):
                issues.append(f"{html_file.name}: Missing shield icon in navigation")
            
            # Check for font imports
            if not re.search(expected_patterns['font_import'], content):
                issues.append(f"{html_file.name}: Missing JetBrains Mono font import")
            
            # Check for FontAwesome
            if not re.search(expected_patterns['fontawesome'], content):
                issues.append(f"{html_file.name}: Missing or incorrect FontAwesome import")
            
            # Check for manifest
            if not re.search(expected_patterns['manifest'], content):
                issues.append(f"{html_file.name}: Missing PWA manifest link")
            
            # Check for favicon
            if not re.search(expected_patterns['favicon'], content):
                issues.append(f"{html_file.name}: Missing favicon link")
            
            # Check for hamburger menu
            hamburger_count = len(re.findall(expected_patterns['hamburger_bar'], content))
            if hamburger_count < 3:
                issues.append(f"{html_file.name}: Inconsistent hamburger menu structure")
            
        except Exception as e:
            issues.append(f"{html_file.name}: Error reading file - {e}")
    
    print(f"\n📊 Validation Results:")
    print(f"   Files checked: {len(html_files)}")
    print(f"   Issues found: {len(issues)}")
    
    if issues:
        print("\n⚠️  Issues detected:")
        for issue in issues:
            print(f"   • {issue}")
    else:
        print("\n✅ All files are consistent!")
    
    # Check for required files
    required_files = [
        'index.html', 'penetration-testing.html', 'custom-software.html', 
        'security-audits.html', 'training.html', 'about.html', 'contact.html',
        'enterprise-security.html', 'fintech-solutions.html', 'healthcare-security.html',
        'government-sector.html', 'careers.html', 'blog.html',
        'styles.css', 'script.js', 'manifest.json', 'sw.js', 'favicon.svg'
    ]
    
    missing_files = [f for f in required_files if not Path(f).exists()]
    
    if missing_files:
        print(f"\n❌ Missing required files:")
        for file in missing_files:
            print(f"   • {file}")
    else:
        print(f"\n✅ All required files present!")
    
    # Check navigation links
    print(f"\n🔗 Checking navigation links...")
    nav_links = {
        'Services': ['penetration-testing.html', 'custom-software.html', 'security-audits.html', 'training.html'],
        'Solutions': ['enterprise-security.html', 'fintech-solutions.html', 'healthcare-security.html', 'government-sector.html'],
        'Company': ['about.html', 'careers.html', 'blog.html', 'contact.html']
    }
    
    link_issues = []
    for category, links in nav_links.items():
        for link in links:
            if not Path(link).exists():
                link_issues.append(f"Missing {category} page: {link}")
    
    if link_issues:
        print("❌ Navigation link issues:")
        for issue in link_issues:
            print(f"   • {issue}")
    else:
        print("✅ All navigation links valid!")

if __name__ == "__main__":
    check_file_consistency()
