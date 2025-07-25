---
title: Collate Automations Documentation
slug: /how-to-guides/data-governance/automation
collate: true
---

# Collate Automations

{% youtube videoId="Q0gPpHQWe3w" start="0:00" end="14:52" width="800px" height="450px" /%}

## Overview

Collate's **Automation** feature is a powerful tool designed to simplify and streamline metadata management tasks. By automating repetitive actions such as assigning owners, domains, or tagging data, Collate helps maintain consistency in metadata across an organization's datasets. These automations reduce manual effort and ensure that metadata is always up-to-date, accurate, and governed according to predefined policies.

## Why Automations are Useful

Managing metadata manually can be challenging, particularly in dynamic environments where data constantly evolves. Collate's Automation feature addresses several key pain points:

- **Maintaining Consistency**: Automation helps ensure that metadata such as ownership, tags, and descriptions are applied consistently across all data assets.
- **Saving Time**: Automations allow data teams to focus on higher-value tasks by eliminating the need for manual updates and maintenance.
- **Enforcing Governance Policies**: Automations help ensure that data follows organizational policies at all times by automatically applying governance rules (e.g., assigning data owners or domains).
- **Data Quality and Accountability**: Data quality suffers without clear ownership. Automating ownership assignments helps ensure that data quality issues are addressed efficiently.

## Key Use Cases for Collate Automations

### 1. Bulk Description

{% image
src="/images/v1.9/how-to-guides/governance/automator-description.png"
alt="Getting started with Automation"
caption="Getting started with Automation"
/%}

- **Problem**: Many datasets lack descriptions, making it difficult for users to understand the data's purpose and contents. Sometimes, the same column description needs to be added to multiple datasets.
- **Solution**: Automations can bulk-apply descriptions to tables and columns, ensuring that all data assets are consistently documented.
- **Benefit**: This use case improves data discoverability and understanding, making it easier for users to find and use the data effectively.

For the Action Configuration:
- **Apply to Children**: Lets you apply the description to the selected child assets (e.g., columns) within an asset.
- **Overwrite Metadata**: Allows you to overwrite existing descriptions with the new description. Otherwise, we will only apply the description to empty tables or columns.

### 2. Bulk Ownership and Domain Assignment

{% image
src="/images/v1.9/how-to-guides/governance/bulk-ownership-and.png"
alt="Getting started with Automation"
caption="Getting started with Automation"
/%}

- **Problem**: Many data assets lack proper ownership and domain assignment, leading to governance and accountability issues. Manually assigning owners can be error-prone and time-consuming.
- **Solution**: Automations can bulk-assign ownership and domains to datasets, ensuring all data assets are correctly categorized and owned. This process can be applied to tables, schemas, or other assets within Collate.
- **Benefit**: This use case ensures data assets have a designated owner and are organized under the appropriate domain, making data more discoverable and accountable.

For the Action Configuration:
- **Overwrite Metadata**: Allows you to overwrite existing owner or domain with the configured one. Otherwise, we will only apply the owner or domain to assets that do not have an existing owner or domain.

### 3. Bulk Tagging and Glossary Term Assignment

{% image
src="/images/v1.9/how-to-guides/governance/bulk-tagging-glossary.png"
alt="Getting started with Automation"
caption="Getting started with Automation"
/%}

- **Problem**: Manually applying the same tags or glossary terms to multiple datasets can be inefficient and inconsistent.
- **Solution**: Automations allow users to bulk-apply tags (e.g., PII) or glossary terms (e.g., Customer ID) to specific datasets, ensuring uniformity across the platform.
- **Benefit**: This automation reduces the risk of missing important tags like PII-sensitive and ensures that key metadata elements are applied consistently across datasets.

For the Action Configuration:
- **Apply to Children**: Lets you apply the Tags or Glossary Terms to the selected child assets (e.g., columns) within an asset.
- **Overwrite Metadata**: Allows you to overwrite existing Tags or Terms with the configured one. Otherwise, we will add the new Tags or Terms to the existing ones.


### 4. Metadata Propagation via Lineage

{% image
src="/images/v1.9/how-to-guides/governance/metadata-propogation.png"
alt="Getting started with Automation"
caption="Getting started with Automation"
/%}

- **Problem**: When metadata such as tags, descriptions, or glossary terms are updated in one part of the data lineage, they may not be propagated across related datasets, leading to inconsistencies.
- **Solution**: Use automations to propagate metadata across related datasets, ensuring that all relevant data inherits the correct metadata properties from the source dataset.
- **Benefit**: Metadata consistency is ensured across the entire data lineage, reducing the need for manual updates and maintaining a single source of truth.

For the Action Configuration:
1. First, we can choose if we want the propagation to happen at the Parent level (e.g., Table), Column Level, or both. This can be configured by selecting **Propagate Parent** and/or **Propagate Column Level**.
2. Then, we can control which pieces of metadata we want to propagate via lineage:
    - **Propagate Description**: Propagates the description from the source asset to the downstream assets. Works for both parent and column-level.
    - **Propagate Tags**: Propagates the tags from the source asset to the downstream assets. Works for both parent and column-level.
    - **Propagate Glossary Terms**: Propagates the glossary terms from the source asset to the downstream assets. Works for both parent and column-level.
    - **Propagate Owners**: Only applicable for Parent assets. Propagates the owner information to downstream assets.
    - **Propagate Tier**: Only applicable for Parent assets. Propagated the tier information to downstream assets.
    - **Propagate Domain**: Only applicable for Parent assets. Propagates the domain information to downstream assets.

As with other actions, you can choose to **Overwrite Metadata** or keep the existing metadata and only apply the new metadata to assets that do not have the metadata already.

#### Advanced Propagation Controls

{% image
src="/images/v1.9/how-to-guides/governance/automator-propagation-advance-config.png"
alt="Automation advanced propagation controls"
caption="Automation advanced propagation controls"
/%}

##### Propagation Depth

The **Propagation Depth** feature allows you to limit how far metadata propagates through your lineage tree:

- **Use Case**: In complex lineage with many edges, you might want to limit how far metadata flows to maintain control and relevance.
- **Configuration**: 
  - Leave it blank to allow complete propagation
  - Set a positive integer (e.g., 1, 2, 3) to limit propagation to specific levels from the root
- **How it works**: 
  - Root entities (those with no upstream lineage) start at depth 0
  - Each downstream neighbor increases the depth by 1
  - Depth is calculated separately for each path from each root entity
  - Example: In lineage A → B → C → D
    - A is at depth 0 (root)
    - B is at depth 1
    - C is at depth 2
    - D is at depth 3
  - Setting depth to 2 means metadata flows only to assets at depth 2 or less (B and C in above example)
  
- **Advanced Scenario - Complex Lineage**: 
  - In scenarios with multiple parent paths (e.g., A → B → C and D → C), depth is calculated for each path independently
  - With propagation depth = 1: C would receive metadata from D (depth 1 from D) but not from A via B (depth 2 from A)
  - This path-aware approach provides precise control over which upstream sources contribute to each downstream asset

**When to use**: 
- When you have deep lineage chains and want to prevent metadata from propagating too far downstream
- When you want to maintain control over which downstream assets receive propagated metadata
- For performance optimization in very large lineage graphs

##### Stop Propagation Conditions

The **Stop Propagation** feature lets you halt metadata flow when certain conditions are matched (e.g., sensitive data markers are encountered):

- **Use Case**: Prevent metadata propagation at specific condition.
- **Supported Attributes**: 
  - `description`: Stop when specific description text is found
  - `tags`: Stop when specific tags are present
  - `glossaryTerms`: Stop when specific glossary terms are found
  - `owner`: Stop when specific owners are assigned
  - `tier`: Stop when specific tier levels are encountered
  - `domain`: Stop when specific domains are assigned

**Important Note**: When a stop condition is matched at a node, the propagation stops AT that node. The node retains its original metadata, and propagation does not continue to its downstream assets.

**Examples**:
1. **Sensitive Data Boundaries**: Stop at nodes tagged as "Confidential" or "PII-Sensitive"
2. **Organizational Boundaries**: Halt at assets owned by specific teams
3. **Domain Transitions**: Stop when crossing into different business domains
4. **Quality Thresholds**: Pause at specific tier levels

**How it works**: 
- The system evaluates metadata at each node during propagation
- When matching any specified condition, propagation stops at that node
- Intelligent matching handles various formats (HTML in descriptions, object types)
- Existing metadata at the stop point remains unchanged

**Configuration Example**:
```yaml
Stop Conditions Examples:
  - Metadata: Tags
    Values: ["PII.Sensitive", "Confidential"]
  - Metadata: Domain
    Values: ["Finance", "Legal"]
  - Metadata: Description
    Values: ["DO NOT PROPAGATE"]
```

### 5. Automatic PII Detection and Tagging

{% image
src="/images/v1.9/how-to-guides/governance/automatic-detection.png"
alt="Getting started with Automation"
caption="Getting started with Automation"
/%}

{% note noteType="Warning" %}

Note that we recommend using the **Auto Classification** workflow instead, which allows you to discover PII data automatically,
even in cases where you don't want to ingest the Sample Data into Collate.

Note that this automation, the ML Tagging, will be deprecated in future releases.

{% /note %}

- **Problem**: Manually identifying and tagging Personally Identifiable Information (PII) across large datasets is labor-intensive and prone to errors.
- **Solution**: Automations can automatically detect PII data (e.g., emails, usernames) and apply relevant tags to ensure that sensitive data is flagged appropriately for compliance.
- **Benefit**: Ensures compliance with data protection regulations by consistently tagging sensitive data, reducing the risk of non-compliance.

## Best Practices

- **Validate Assets Before Applying Actions**: Always use the **Explore** page to verify the assets that will be affected by the automation. This ensures that only the intended datasets are updated.
- **Use Automation Logs**: Regularly check the **Recent Runs** logs to monitor automation activity and ensure that they are running as expected.
- **Propagate Metadata Thoughtfully**: When propagating metadata via lineage, make sure that the source metadata is correct before applying it across multiple datasets.
- **Start with Controlled Propagation**: For complex and large lineage trees, begin the propagation with a limited propagation depth (e.g., 2-3 levels/depth) and gradually increase as needed to avoid unintended widespread changes.
- **Understand Path-Aware Depth Behavior**: In complex lineage with multiple parent paths, remember that propagation depth is calculated separately for each path from each root entity. This ensures precise control over which upstream sources contribute metadata to downstream assets.
- **Set Up Stop Conditions for Critical Data**: Cofigure strategic stop conditions around critical ownership boundaries or sensitive data boundaries (Tags- PII, Confidential) to prevent accidental metadata overwrites.
